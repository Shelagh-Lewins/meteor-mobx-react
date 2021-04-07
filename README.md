# Meteor tech investigation, dated April 2021
This is a testbed project to combine the following technologies:

* Meteor 2.1
* React ^17.0.2
* Typescript ^4.0.2
* Material UI 4.11.3
* SCSS via fourseven:scss@4.12.0

These instructions worked for me in April 2021, though they likely have ommissions - check package.json for dependencies. However beware any future reader, you will likely find things work differently as soon as new versions are released.

## Meteor
The initial app is created using a command line option which creates a Meteor app with React and Typescript:

```
meteor create --typescript 2021-meteor-tech-investigation
```

The --typescript flag was [announced in the Meteor 1.8](https://blog.meteor.com/announcing-meteor-1-8-2-13eab70a4bec) release but [has not yet been added to the documentation](https://github.com/meteor/docs/issues/676).

I updated [React and React Dom to remove a deprecation warning](https://stackoverflow.com/questions/66489286/sharedarraybuffer-will-require-cross-origin-isolation-as-of-m91-around-may-2021):

```
npm i react@latest react-dom@latest
```


Make sure to remove the insecure package - very important for any Meteor project!

```
meteor remove insecure
```


## Material UI
No special setup was needed for Meteor, I just followed the [docs](https://material-ui.com/). I installed the node modules:

```
npm install @material-ui/core
```

```
npm install @material-ui/icons
```

```
npm install @material-ui/styles
```

And I added a link to the Roboto font in the head of main.html:

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

And the meta tag to fix mobile view:

```
	<meta
		name="viewport"
		content="minimum-scale=1, initial-scale=1, width=device-width"
	/>
```


## SASS
Why use SASS if you're already using Material UI? Material UI is great for the MUI elements like Buttons, but is not elegant for nesting and general styling of your site, and SASS has loads of other great features like variables. I suggest using Material UI for anything that you'd typically include in a UI module, and SASS for anything more general to your site.

The easiest way to use SASS in Meteor still seems to be with the old fourseven package:


```
meteor add fourseven:scss
```

fourseven uses node-sass, not dart-sass, and therefore doesn't support the newer @use syntax. You have to use the now discouraged @import. There is a promised upgrade to [fourseven to use Dart](https://github.com/Meteor-Community-Packages/meteor-scss/pull/296) in the pipeline.

## Environment variables
To load environment variables from the .env file (which should never be checked into git or GitHub!) run the app by running the bash script run_meteor.sh.

## Linting
The following linters should be installed globally in your development environment:

```
npm install -g sass-lint
```

```
npm install -g htmlhint@latest
```

It seemed that sass-lint also needs to be a package dependency:

```
npm i --save-dev sass-lint
```

The following Sublime Text plugins are required:

* Sass
* Sublime Linter
* SublimeLinter-contrib-htmlhint
* SublimeLinter-contrib-sass-lint
* SublimeLinter-eslint
