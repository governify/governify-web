const https = require("https");
const fs = require("fs");

const pages = {
    "./content/development/commons.md": "https://raw.githubusercontent.com/governify/commons/main/README.MD",
    "./content/components/Render.md": "https://raw.githubusercontent.com/governify/render/main/README.md",
    "./content/components/Assets.md": "https://raw.githubusercontent.com/governify/assets-manager/main/README.md",
    "./content/components/Reporter.md": "https://raw.githubusercontent.com/governify/reporter/main/README.md",
    "./content/components/Registry.md": "https://raw.githubusercontent.com/governify/registry/main/README.md",
    "./content/components/Collectors/CollectorEvents.md": "https://raw.githubusercontent.com/governify/collector-events/main/README.md",
    "./content/components/Collectors/CollectorDynamic.md": "https://raw.githubusercontent.com/governify/collector-dynamic/main/README.md",
    "./content/components/Dashboard.md": "https://raw.githubusercontent.com/governify/dashboard/main/README.md",
    "./content/components/Scopes.md": "https://raw.githubusercontent.com/governify/scope-manager/main/README.md",
    "./content/components/Director.md": "https://raw.githubusercontent.com/governify/director/main/README.md"
}

const main = async () => {
    for (const entry of Object.entries(pages)) {
        await https.get(entry[1],res => {
            let data = '';
    
            res.on('data', chunk => {
                data += chunk;
            });
    
            res.on('end', () => {
                fs.writeFileSync(entry[0], data, 'utf-8');
            });
        }).on("error", console.log);
    }
}

main();
