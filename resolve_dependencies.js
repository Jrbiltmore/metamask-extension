const { exec } = require("child_process");

function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

async function main() {
  try {
    // Step 1: Clear npm cache
    await execute("npm cache clean --force");

    // Step 2: Install dependencies with yarn
    await execute("yarn install");

    // Step 3: Resolve dependency conflicts
    await execute("yarn explain peer-requirements");

    console.log("Dependency resolution successful!");
  } catch (error) {
    console.error("Error during dependency resolution:", error);
  }
}

main();
