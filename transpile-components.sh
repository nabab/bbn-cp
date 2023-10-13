#!/bin/bash

SRC_DIR="./src/components"
DIST_DIR="./dist/components"

# Create the dist/components directory if it doesn't exist
mkdir -p $DIST_DIR

if [ "$#" -eq 1 ]; then
    SPECIFIC_COMPONENT="$1"
else
    SPECIFIC_COMPONENT=""
fi

if [ -z "$SPECIFIC_COMPONENT" ]; then
    COMPONENTS="$SRC_DIR/*"
else
    COMPONENTS="$SRC_DIR/$SPECIFIC_COMPONENT"
fi
# Loop through each component directory
for componentDir in $COMPONENTS; do
    if [ -d "$componentDir" ]; then
        componentName=$(basename $componentDir)
        
        # Check if the component has a .js file with the same name
        if [ -f "$componentDir/$componentName.js" ]; then
            # Create the component's dist directory
            mkdir -p "$DIST_DIR/$componentName"
            # Transpile the component .js file
            npx babel "$componentDir/$componentName.js" -o "$DIST_DIR/$componentName/$componentName.js"

            moduleFile="$DIST_DIR/${componentName}/${componentName}";
            moduleContent=$(<${moduleFile}.js)
            
            # Process HTML file if it exists
            if [ -f "${componentDir}/${componentName}.html" ]; then
            htmlContent=$(<${componentDir}/${componentName}.html)
            else
            htmlContent=""
            fi

            # Process LESS file if it exists and compile to CSS
            if [ -f "${componentDir}/${componentName}.less" ]; then
            styleContent=$(./node_modules/.bin/lessc ${componentDir}/${componentName}.less)
            else
            styleContent=""
            fi

            shopt -s nullglob
            # Process i18n files and generate the i18n object
            for langFile in ${componentDir}/*.lang; do
                lang=$(basename "$langFile" | cut -d. -f2) # extracts 'en' from 'dropdown.en.json'
                i18nContent=$(<$langFile)
                # Write to the final JS file
                echo "export default {" > ${moduleFile}.$lang.js
                echo "  script: \`$moduleContent\`," >> ${moduleFile}.$lang.js
                echo "  html: \`$htmlContent\`," >> ${moduleFile}.$lang.js
                echo "  style: \`$styleContent\`," >> ${moduleFile}.$lang.js
                echo "  lang: $i18nContent" >> ${moduleFile}.$lang.js
                echo "}" >> ${moduleFile}.$lang.js
            done
            shopt -u nullglob  # Turn off the nullglob option

            # Write to the final JS file
            echo "export default {" > ${moduleFile}.js
            echo "  script: \`$moduleContent\`," >> ${moduleFile}.js
            echo "  html: \`$htmlContent\`," >> ${moduleFile}.js
            echo "  style: \`$styleContent\`," >> ${moduleFile}.js
            echo "  lang: $i18nContent" >> ${moduleFile}.js
            echo "}" >> ${moduleFile}.js


        fi

        # Copy non-JavaScript files
        for file in $(ls $componentDir | grep -vE "\.(js|html|less|lang)$"); do
            cp -r "$componentDir/$file" "$DIST_DIR/$componentName/$file"
        done
        echo "Processed component: $componentName"
    fi
done


