#!/usr/bin/env node

require("dotenv").config();

const fs = require("fs-extra");
const { red, green, gray } = require("kleur");
const Table = require("cli-table3");

(async () => {
  const writeJsonOption = {
    spaces: 2,
  };

  try {
    const file1 = "./package.json";
    const file2 = "./public/manifest.json";
    const clear1 = "./build";
    const clear2 = "./dist";

    const {
      REACT_APP_AUTHOR,
      REACT_APP_HOMEPAGE,
      REACT_APP_TITLE,
      REACT_APP_DESCRIPTION,
      REACT_APP_THEME_COLOR,
      REACT_APP_BACKGROUND_COLOR,
    } = process.env;

    const packageJson = await fs.readJson(file1);
    const manifestJson = await fs.readJson(file2);

    console.log(`\n> ${packageJson.name}@${packageJson.version} prebuild`);
    console.log("> prebuild");
    console.log("  • Print out environment: \n");

    var table = new Table({
      head: ["Key", "Value"],
    });

    for (let key in process.env) {
      if (key === "PUBLIC_URL" || key.startsWith("REACT_APP")) {
        table.push([key, process.env[key]]);
      }
    }
    console.log(gray(table.toString()), "\n");

    await fs.remove(clear1);
    console.log(green(`  • Remove ${clear1} successfully`));

    await fs.remove("./dist");
    console.log(green(`  • Remove ${clear2} successfully`));

    packageJson.build.productName = REACT_APP_TITLE;
    packageJson.author = REACT_APP_AUTHOR;
    packageJson.description = REACT_APP_DESCRIPTION;
    packageJson.homepage = REACT_APP_HOMEPAGE || "./";

    await fs.writeJson(file1, packageJson, writeJsonOption);
    console.log(green(`  • Update ${file1} successfully`));

    manifestJson.name = REACT_APP_TITLE;
    manifestJson.short_name = REACT_APP_TITLE;
    manifestJson.theme_color = REACT_APP_THEME_COLOR;
    manifestJson.background_color = REACT_APP_BACKGROUND_COLOR;
    await fs.writeJson(file2, manifestJson, writeJsonOption);
    console.log(green(`  • Update ${file2} successfully`));

    console.log("");
  } catch (error) {
    console.log(red(error));
  }
})();
