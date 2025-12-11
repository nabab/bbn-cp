// ---- PRIVATE HELPERS (file level, not exported) ------------------------

const sunday = 0;

function createCalendarItem(ctx, text, value, hidden, colored, disabled, extra) {
  const isCurrent = value === bbn.dt(ctx.today).format(ctx.currentCfg.valueFormat);
  const events = ctx.events[value];
  const item = {
    text,
    value,
    isCurrent,
    hidden: !!hidden,
    colored: !!colored,
    over: false,
    events,
    inRange: ctx.itemsRange.includes(value),
    disabled: !!disabled,
    extra: !!extra,
    key: bbn.fn.randomString(32, 32)
  };

  item.highlight =
    (ctx.highlightCurrent && isCurrent) ||
    (bbn.fn.isFunction(ctx.highlightDates) && ctx.highlightDates(item)) ||
    (bbn.fn.isArray(ctx.highlightDates) && ctx.highlightDates.includes(value));

  // Hide if onlyEvents, or outside min/max
  if (
    (ctx.onlyEvents && (!events || !events.length)) ||
    (ctx.currentMin && value < ctx.currentMin.format(ctx.currentCfg.valueFormat)) ||
    (ctx.currentMax && value > ctx.currentMax.format(ctx.currentCfg.valueFormat))
  ) {
    item.hidden = true;
  }

  // Disable specific dates
  if (ctx.disableDates) {
    item.disabled = bbn.fn.isFunction(ctx.disableDates)
      ? ctx.disableDates(value)
      : ctx.disableDates.includes(value);
  }

  // Disable when no events if requested
  if (ctx.disableNoEvents && !item.disabled) {
    item.disabled = !events || !events.length;
  }

  return item;
}

function normalizeDay(d) {
  return d && d.startOf('day');
}

function isSameDay(a, b) {
  return a && b && a.valueOf() === b.valueOf();
}

function isBeforeDay(a, b) {
  return a && b && a.valueOf() < b.valueOf();
}

function isAfterDay(a, b) {
  return a && b && a.valueOf() > b.valueOf();
}

/**
 * How many days to subtract from a date to reach the start of its week,
 * given ctx.firstWeekDay (0..6, Day.js weekday).
 */
function offsetToWeekStart(ctx, d) {
  const dow = d.weekday();
  return (dow - ctx.firstWeekDay + 7) % 7;
}

/**
 * How many days to add to reach the end of its week.
 */
function offsetToWeekEnd(ctx, d) {
  const dow = d.weekday();
  return (ctx.firstWeekDay + 6 - dow + 7) % 7;
}

/**
 * Center (or left-bias) a "selected month" in the strip of months to show,
 * clamped into [minMonth, maxMonth].
 */
function chooseStartMonth(ctx, selected, count, minMonth, maxMonth) {
  const selectedMonth = selected.startOf('month');

  let selectedIndex;
  if (count % 2 === 1) {
    selectedIndex = (count - 1) / 2;
  } else {
    selectedIndex = count / 2 - 1;
  }

  let start = selectedMonth.subtract(selectedIndex, 'month');

  if (minMonth && start.isBefore(minMonth)) {
    start = minMonth;
  }

  if (maxMonth) {
    const latestStart = maxMonth.subtract(count - 1, 'month');
    if (start.isAfter(latestStart)) {
      start = latestStart;
    }
  }

  return start.startOf('month');
}

/**
 * Trims full rows of hidden items at top and bottom (for 3-column grids),
 * and returns { items, rows }.
 */
function trimHiddenRows(items, columns, baseRows) {
  let numHiddenTop = 0;
  for (let i = 0; i < items.length; i++) {
    if (!items[i].hidden) {
      break;
    }
    numHiddenTop++;
  }

  let numHiddenBottom = 0;
  for (let i = items.length - 1; i >= 0; i--) {
    if (!items[i].hidden) {
      break;
    }
    numHiddenBottom++;
  }

  const delTop = numHiddenTop ? Math.floor(numHiddenTop / columns) : 0;
  const delBottom = numHiddenBottom ? Math.floor(numHiddenBottom / columns) : 0;
  const rows = baseRows - delTop - delBottom;

  const startIndex = delTop * columns;
  const endIndex = items.length - delBottom * columns;
  const trimmed = items.slice(startIndex, endIndex);

  return { items: trimmed, rows };
}

/**
 * Build the "days" view structure.
 * Returns { months, gridStyle, firstDayVisible, lastDayVisible, maxWeeks }
 */
function buildDaysView(ctx) {
  const today = bbn.dt().startOf('day');
  const selected = (ctx.currentDate || today).startOf('day');

  const minD = normalizeDay(ctx.currentMin);
  const maxD = normalizeDay(ctx.currentMax);

  const minMonth = minD ? minD.startOf('month') : null;
  const maxMonth = maxD ? maxD.startOf('month') : null;

  if (minMonth && maxMonth && minMonth.isAfter(maxMonth)) {
    return { months: [], gridStyle: '', firstDayVisible: null, lastDayVisible: null, maxWeeks: 0 };
  }

  let maxShowableMonths = Infinity;
  if (minMonth && maxMonth) {
    maxShowableMonths = maxMonth.diff(minMonth, 'month') + 1;
  }
  const monthsToBuild = Math.min(ctx.numMonth, maxShowableMonths);

  const months = [];
  const baseMonthStart = chooseStartMonth(ctx, selected, monthsToBuild, minMonth, maxMonth);

  let firstDayVisible = null;
  let lastDayVisible = null;
  let maxWeeks = 0;

  for (let m = 0; m < monthsToBuild; m++) {
    const firstOfMonth = baseMonthStart.add(m, 'month');
    const lastOfMonth = firstOfMonth.endOf('month');

    const gridStart = firstOfMonth
      .subtract(offsetToWeekStart(ctx, firstOfMonth), 'day')
      .startOf('day');
    const gridEnd = lastOfMonth
      .add(offsetToWeekEnd(ctx, lastOfMonth), 'day')
      .startOf('day');

    const weeks = [];
    let cursor = gridStart.clone();
    let currentWeek = [];
    let lastDate = null;

    while (cursor.valueOf() <= gridEnd.valueOf()) {
      const cellDate = cursor.clone();
      const inMonth = cellDate.month() === firstOfMonth.month();

      const isDisabled =
        (minD && isBeforeDay(cellDate, minD)) ||
        (maxD && isAfterDay(cellDate, maxD));

      const value = cellDate.format(ctx.currentCfg.valueFormat);
      const item = createCalendarItem(
        ctx,
        cellDate.day(),    // label (was: cellDate.day(), if you want date() use that)
        value,
        !inMonth,
        cellDate.weekday() === sunday,
        isDisabled,
        false
      );

      currentWeek.push(item);

      if (!item.hidden) {
        if (!firstDayVisible) {
          firstDayVisible = item;
        } else {
          lastDayVisible = item;
        }
      }

      if (currentWeek.length === 7) {
        weeks.push({
          days: currentWeek,
          week: cellDate.week(),
          index: weeks.length
        });
        currentWeek = [];
      }

      lastDate = cellDate;
      cursor = cursor.add(1, 'day');
    }

    if (currentWeek.length) {
      weeks.push({
        days: currentWeek,
        week: lastDate.week(),
        month: lastDate.month(),
        year: lastDate.year(),
        index: weeks.length,
        monthIndex: months.length
      });
    }

    if (weeks.length > maxWeeks) {
      maxWeeks = weeks.length;
    }

    months.push({
      weeks,
      month: firstOfMonth.month(),
      year: firstOfMonth.year(),
      index: months.length
    });
  }

  const gridStyle = `grid-template-columns: repeat(7, minmax(2rem, 1fr)); grid-template-rows: minmax(2rem, max-content) repeat(${maxWeeks}, minmax(2rem, 1fr))`;

  return { months, gridStyle, firstDayVisible, lastDayVisible, maxWeeks };
}

/**
 * Build the "weeks" view structure.
 * Returns { items, gridStyle, currentLabelsDates }
 */
function buildWeeksView(ctx) {
  const c = bbn.dt(ctx.currentDate.value);
  const sunday = bbn.dt(c.value).getWeekdayIndex('Sunday');

  const items = Array.from({ length: 7 }, function(_, k) {
    const w = c.weekday(k);
    return createCalendarItem(
      ctx,
      w.day,
      w.format(ctx.currentCfg.valueFormat),
      false,
      k === sunday,
      false,
      false
    );
  });

  const currentLabelsDates = Array.from(
    { length: 7 },
    function(_, i) {
      return ctx.currentDate.setWeekday((i + ctx.firstWeekDay) % 7);
    }
  );

  const gridStyle = 'grid-template-columns: repeat(7, minmax(2rem, 1fr)); grid-template-rows: minmax(2rem, max-content) auto';

  return { items, gridStyle, currentLabelsDates };
}

/**
 * Build the "months" view structure.
 * Returns { items, gridStyle }
 */
function buildMonthsView(ctx) {
  let c = bbn.dt(ctx.currentDate.format('YYYY-01-01'));

  const allItems = Array.from({ length: 12 }, function(_, k) {
    if (k) {
      c = c.add(1, 'month');
    }
    const w = c;
    const isOtherYear = w.year !== ctx.currentDate.year;
    return createCalendarItem(
      ctx,
      w.format('MMM'),
      w.format(ctx.currentCfg.valueFormat),
      !ctx.extraItems && isOtherYear,
      false,
      false,
      ctx.extraItems && isOtherYear
    );
  });

  const { items, rows } = trimHiddenRows(allItems, 3, 4);
  const gridStyle = `grid-template-columns: repeat(3, minmax(2rem, 1fr)); grid-template-rows: repeat(${rows}, minmax(2rem, 1fr));`;

  return { items, gridStyle };
}

/**
 * Build the "years" view structure.
 * Returns { items, gridStyle }
 */
function buildYearsView(ctx) {
  const c = bbn.dt(ctx.currentDate.format('YYYY-01-01'));
  const year = parseInt(c.format('YYYY'), 10);

  const allItems = Array.from({ length: 12 }, function(_, k) {
    const w = c.year(year - 6 + k);
    return createCalendarItem(
      ctx,
      w.format('YYYY'),
      w.format(ctx.currentCfg.valueFormat),
      false,
      false,
      k === 0 || k === 11,
      false
    );
  });

  const { items, rows } = trimHiddenRows(allItems, 3, 4);
  const gridStyle = `grid-template-columns: repeat(3, minmax(2rem, 1fr)); grid-template-rows: repeat(${rows}, minmax(2rem, 1fr));`;

  return { items, gridStyle };
}

export {
  buildDaysView,
  buildWeeksView,
  buildMonthsView,
  buildYearsView
};