#!/bin/bash

SRC_DIR="./src/components"
DIST_DIR="./dist/components"

if [ -d "$DIST_DIR" ]; then
    rm -rf $DIST_DIR
fi

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
            ./node_modules/.bin/babel --source-type module "$componentDir/$componentName.js" -o "$componentDir/$componentName.source.js"

            moduleFile="$SRC_DIR/${componentName}/${componentName}";
            
            # Process HTML file if it exists
            if [ -f "${componentDir}/${componentName}.html" ]; then
                htmlContent=$(<${componentDir}/${componentName}.html)
                escapedHtmlContent=$(echo "$htmlContent" | sed 's/`/\\`/g')
            else
                escapedHtmlContent=""
            fi
#
            ## Process LESS file if it exists and compile to CSS
            if [ -f "${componentDir}/${componentName}.less" ]; then
                styleContent=$(./node_modules/.bin/lessc ${componentDir}/${componentName}.less)
                escapedStyleContent=$(echo "$styleContent" | sed 's/`/\\`/g')
    	    else
                escapedStyleContent=""
            fi
#
            # Process i18n files and generate the i18n object
            if [[ $(find "${componentDir}" -name "*.lang" -type f | wc -l) -gt 0 ]]; then
                for langFile in ${componentDir}/*.lang; do
                    lang=$(basename "$langFile" | cut -d. -f2) # extracts 'en' from 'dropdown.en.json'
                    i18nContent=$(<$langFile)
                    # Write to the final JS file
                    echo "import componentScript from './$componentName.source.js';" > ${moduleFile}.$lang.mjs
                    echo "export default {" >> ${moduleFile}.$lang.mjs
                    echo "  name: 'bbn-$componentName'," >> ${moduleFile}.$lang.mjs
                    echo "  definition: componentScript," >> ${moduleFile}.$lang.mjs
                    echo "  template: \`$escapedHtmlContent\`," >> ${moduleFile}.$lang.mjs
                    echo "  css: \`$escapedStyleContent\`," >> ${moduleFile}.$lang.mjs
                    echo "  lang: $i18nContent" >> ${moduleFile}.$lang.mjs
                    echo "}" >> ${moduleFile}.$lang.mjs
                    #./node_modules/.bin/minify ${moduleFile}.$lang.js > ${moduleFile}.$lang.min.js
                done
            fi
#
            # Write to the final JS file
            echo "import componentScript from './$componentName.source.js';" > ${moduleFile}.mjs
            echo "export default {" >> ${moduleFile}.mjs
            echo "  name: 'bbn-$componentName'," >> ${moduleFile}.mjs
            echo "  definition: componentScript," >> ${moduleFile}.mjs
            echo "  template: \`$escapedHtmlContent\`," >> ${moduleFile}.mjs
            echo "  css: \`$escapedStyleContent\`," >> ${moduleFile}.mjs
            echo "  lang: $i18nContent" >> ${moduleFile}.mjs
            echo "}" >> ${moduleFile}.mjs
            #./node_modules/.bin/minify ${moduleFile}.js > ${moduleFile}.min.js
        fi

        # Copy non-JavaScript files
        for file in $(ls $componentDir | grep -vE "\.(js|mjs|html|less)$"); do
            cp -r "$componentDir/$file" "$DIST_DIR/$componentName/$file"
        done
        echo "Processed component: $componentName"
    fi
done



