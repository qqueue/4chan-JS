4chan JS - Present Day, Present Time
====================================

This fork of the [canonical 4chan JS repository][0] tracks the production
version of 4chan-JS as deployed on 4chan.org, auto-updated by a simple script +
cron as Moot and "Anonymous ## Developer" are unwilling or unmotivated to keep
the real repository up to date. The purpose of this repository is to provide
the missing changelog of bugfixes, new features, and potential breaking API
changes that other 4chan extension/userscript developers will care about.

Unfortunately, 4chan's production JS is stripped of comments and
whitespace-minified. Thus, the code is run through [jsbeautifier][1] before
commiting to restore at least a semblance of human readability.

[0]: https://github.com/4chan/4chan-JS
[1]: https://github.com/einars/js-beautify 

## About 4chan JS (from canonical repository) ##

8 years ago, our very own DamageInc created the first 4chan extension as a Firefox add-on. Now, we've implemented these features directly into the site, open sourced it, and invite the community to contribute code and feedback.

In addition, we offer a read-only JSON API that you can read more about [here](https://github.com/4chan/4chan-API).

<hr>

Bugs and feature requests should be submitted to the repo's [Issues page](https://github.com/4chan/4chan-JS/issues).

This code is released under a 3-clause BSD license, [available here](https://raw.github.com/4chan/4chan-JS/master/LICENSE).

Many thanks to [desuwa](https://github.com/desuwa) of The Yotsuba Catalog for being a total badass, and almost single-handedly bringing this project to fruition.

Thanks also to DamageInc for creating the original 4chan browser add-on, and to [aeosynth](https://github.com/aeosynth) (creator) and [MayhemYDG](https://github.com/MayhemYDG) (maintainer) of 4chan X, for providing inspiration.
