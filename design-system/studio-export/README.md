# How to set up and pull tokens from Tokens Studio

## 1. Setup Tokens Studio

1. Run the setup command:


# Install token studio >= 3.x.x (in package.json

```bash
npx tokensstudio setup
```

When prompted, paste your Personal Access Token (PAT).

This command will update your .tokenstudio.json file with the project and organization IDs.

After running the script, make sure the config contains:

```bash
"output": "tokens-studio"
```

2. Pull tokens

To fetch the latest tokens from Tokens Studio, run:

```bash
npx tokensstudio pull
```

This will:

- Pull the tokens from Tokens Studio
- Update the JSON files in the tokens folder
- Update the themes.json file (note: this is not required for generating CSS files)

3. Generate CSS variables

To generate the CSS variables, run:

```bash
npx run build
```

This will create the CSS variable files in the dist/token directory.


## Troubleshooting
If the css vars not found then check the path to the files tokens files `./token-studio/build-css-tokens.js`
