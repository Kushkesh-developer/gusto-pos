# gusto-pos

[`Gusto POS Migration from TypeScript to JavaScript`]

To migrate the gusto-pos-ts folder to gusto-pos-js and perform necessary file transformations, follow these steps:

1. Navigate to the gusto-pos-ts Folder
First, go to the directory where your gusto-pos-ts folder is located.

bash

```bash
cd gusto-pos-ts
```


2. Run the Build Command
Use the provided script to initiate the migration process:

bash
```bash
npm run build-js
```

This command will trigger the migration and compile TypeScript files into JavaScript.



3. If Building Fails, Use Babel for Manual Compilation
If there is an issue with the build process, you can manually convert the files using Babel. Run the following command:

```bash
npx babel src --out-dir ../gusto-pos-js/src --extensions '.ts,.tsx' --copy-files
```

This will convert your TypeScript files (.ts and .tsx) from the src folder and place them into the corresponding gusto-pos-js/src folder.


4. Check for Compilation Success
Once the migration is complete, you should see a success message in the console:

--------Successfully compiled {number of files} files with Babel ({time}ms).

This indicates that the files have been successfully compiled.


5. Go to the Parent Directory
After the conversion is complete, navigate back to the parent directory:

```bash
cd ..
```


6. Navigate to the gusto-pos-js Folder
Now, go to the gusto-pos-js folder where the converted files are located:

```bash
cd gusto-pos-js
```


7. Format the Files
To correct the file formatting, run the following command:

```bash
npm run format
```
This will ensure that the files are properly formatted according to your project's style guide.



8. Run the Development Server
Now, you can either start the development server directly, which will also format the files each time it runs:

```bash
npm run dev
```

This step-by-step guide ensures that your migration process from TypeScript to JavaScript in the gusto-pos project is clear and easy to follow.