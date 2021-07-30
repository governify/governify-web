const https = require("https");
const fs = require("fs");

const pages = {
    "./content/development/tooling/commons.md": "https://raw.githubusercontent.com/governify/commons/main/README.MD",
    "./content/development/tooling/dev-tools.md": "https://raw.githubusercontent.com/governify/dev-tools/main/README.md",
    "./content/development/architecture/render.md": "https://raw.githubusercontent.com/governify/render/main/README.md",
    "./content/development/architecture/assets.md": "https://raw.githubusercontent.com/governify/assets-manager/main/README.md",
    "./content/development/architecture/reporter.md": "https://raw.githubusercontent.com/governify/reporter/main/README.md",
    "./content/development/architecture/registry.md": "https://raw.githubusercontent.com/governify/registry/main/README.md",
    "./content/development/architecture/collectors/collector-events.md": "https://raw.githubusercontent.com/governify/collector-events/main/README.md",
    "./content/development/architecture/collectors/collector-dynamic.md": "https://raw.githubusercontent.com/governify/collector-dynamic/main/README.md",
    "./content/development/architecture/dashboard.md": "https://raw.githubusercontent.com/governify/dashboard/main/README.md",
    "./content/development/architecture/scopes.md": "https://raw.githubusercontent.com/governify/scope-manager/main/README.md",
    "./content/development/architecture/director.md": "https://raw.githubusercontent.com/governify/director/main/README.md"
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
