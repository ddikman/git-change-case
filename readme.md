# git-change-case

This command line tool will find all files matching the extension in any subfolders and change the casing to lower-case kebab case.

For example `Snake_case.tsx` would become `snake-case.tsx`. It uses `git mv` to do the renaming.

## usage

```
git-change-case <directory> [extension]
```

If you provide the 2nd argument, it will be used to match extensions such as `git-change-case . svg`, `git-change-case . 'svg|png'` or `git-change-case . *`. The parameter will be used inside a regular expression.

## run locally

```shell
npm link
git-change-case .
```