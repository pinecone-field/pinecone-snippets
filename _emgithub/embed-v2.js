(() => {
  const sourceURL = new URL(document.currentScript.src);
  const params = sourceURL.searchParams;
  const target = new URL(params.get("target"));
  const type = params.get("type") || 'code';
  const style = params.get("style");
  // const styleClassName = `hljs-style-${style.replace(/[^a-zA-Z0-9]/g, '-')}`;
  // const lightStyles = ['default', 'a11y-light', 'arduino-light', 'ascetic', 'atom-one-light', 'brown-paper', 'color-brewer', 'docco', 'foundation', 'github', 'googlecode', 'gradient-light', 'grayscale', 'idea', 'intellij-light', 'isbl-editor-light', 'kimbie-light', 'lightfair', 'magula', 'mono-blue', 'nnfx-light', 'panda-syntax-light', 'paraiso-light', 'purebasic', 'qtcreator-light', 'routeros', 'school-book', 'stackoverflow-light', 'tokyo-night-light', 'vs', 'xcode', 'base16/atelier-cave-light', 'base16/atelier-dune-light', 'base16/atelier-estuary-light', 'base16/atelier-forest-light', 'base16/atelier-heath-light', 'base16/atelier-lakeside-light', 'base16/atelier-plateau-light', 'base16/atelier-savanna-light', 'base16/atelier-seaside-light', 'base16/atelier-sulphurpool-light', 'base16/brush-trees', 'base16/classic-light', 'base16/cupcake', 'base16/cupertino', 'base16/default-light', 'base16/dirtysea', 'base16/edge-light', 'base16/equilibrium-gray-light', 'base16/equilibrium-light', 'base16/fruit-soda', 'base16/github', 'base16/google-light', 'base16/grayscale-light', 'base16/gruvbox-light-hard', 'base16/gruvbox-light-medium', 'base16/gruvbox-light-soft', 'base16/harmonic16-light', 'base16/heetch-light', 'base16/horizon-light', 'base16/humanoid-light', 'base16/ia-light', 'base16/material-lighter', 'base16/mexico-light', 'base16/one-light', 'base16/papercolor-light', 'base16/ros-pine-dawn', 'base16/sagelight', 'base16/shapeshifter', 'base16/silk-light', 'base16/solar-flare-light', 'base16/solarized-light', 'base16/summerfruit-light', 'base16/synth-midnight-terminal-light', 'base16/tomorrow', 'base16/unikitty-light', 'base16/windows-10-light', 'base16/windows-95-light', 'base16/windows-high-contrast-light', 'base16/windows-nt-light'];
  const isDarkStyle = style === "dark";
  const showBorder = params.get("showBorder") === "on";
  const showLineNumbers = params.get("showLineNumbers") === "on";
  const showFileMeta = params.get("showFileMeta") === "on";
  const showFullPath = params.get("showFullPath") === "on";
  const showCopy = params.get("showCopy") === "on";
  const fetchFromJsDelivr = params.get("fetchFromJsDelivr") === "on";
  const maxHeight = (() => {
    const parsedValue = Number.parseInt(params.get('maxHeight'), 10);
    return Number.isNaN(parsedValue) ? undefined : parsedValue;
  })();
  const lineSplit = target.hash.split("-");
  const startLine = target.hash !== "" && lineSplit[0].replace("#L", "") || -1;
  const endLine = target.hash !== "" && lineSplit.length > 1 && lineSplit[1].replace("L", "") || startLine;
  const tabSize = target.searchParams.get("ts") || 8;
  const pathSplit = target.pathname.split("/");
  const user = pathSplit[1];
  const repository = pathSplit[2];
  const branch = pathSplit[4];
  const filePath = pathSplit.slice(5, pathSplit.length).join("/");
  const directoryPath = pathSplit.slice(5, pathSplit.length - 1).join("/");
  const fileExtension = filePath.split('.').length > 1 ? filePath.split('.').pop() : 'txt';
  const fileURL = target.href;
  const serviceProvider = new URL("./", sourceURL.href).href;
  const rawFileURL = fetchFromJsDelivr
    ? `https://cdn.jsdelivr.net/gh/${user}/${repository}@${branch}/${filePath}`
    : `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${filePath}`;
  const rawDirectoryURL = fetchFromJsDelivr
    ? `https://cdn.jsdelivr.net/gh/${user}/${repository}@${branch}/${directoryPath}/`
    : `https://raw.githubusercontent.com/${user}/${repository}/${branch}/${directoryPath}/`;

  const containerId = Math.random().toString(36).substring(2);
  document.currentScript.insertAdjacentHTML(
    'afterend',
    `

<style>
  .lds-ring {
    margin: 3rem auto;
    position: relative;
    width: 60px;
    height: 60px
  }

  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 48px;
    height: 48px;
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #888 transparent transparent transparent
  }

  .lds-ring div:nth-child(1) {
    animation-delay: -.45s
  }

  .lds-ring div:nth-child(2) {
    animation-delay: -.3s
  }

  .lds-ring div:nth-child(3) {
    animation-delay: -.15s
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg)
    }

    100% {
      transform: rotate(360deg)
    }
  }
</style>

<style>
  .emgithub-file {
    overflow: hidden;
  }


  .emgithub-file .file-meta {
    padding: 10px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  }

  .emgithub-file .file-meta-light {
    color: #586069;
    background-color: #f7f7f7;
    border-top: 1px solid #ccc;
  }

  .emgithub-file .file-meta-dark {
    color: #f7f7f7;
    background-color: #586069;
    border-top: 1px solid #555;
  }

  .emgithub-file .file-meta a {
    font-weight: 600;
    text-decoration: none;
    border: 0;
  }

  .emgithub-file .file-meta-light a {
    color: #666;
  }

  .emgithub-file .file-meta-dark a {
    color: #fff;
  }

  /* hide content for small device */
  @media (max-width: 575.98px) {
    .emgithub-file .hide-in-phone {
      display: none;
    }
  }
</style>

<style>
  .emgithub-file .code-area {
    position: relative;
  }

  .emgithub-file .code-area .copy-btn {
    border-radius: 6px;
    text-decoration: none;
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    padding: 6px;
  }

  .emgithub-file .code-area .copy-btn {
    border: 1px solid rgba(var(--text-secondary-rgb), 0.4);
  }

  .emgithub-file .code-area .copy-btn-dark {
    border: 1px solid rgba(var(--text-primary-rgb), 0.3);
  }

  .emgithub-file .code-area .copy-btn:hover {
    opacity: 1;
  }

  .emgithub-file .code-area .copy-btn-light svg path {
    fill: var(--text-secondary);
    opacity: 0.4;
  }

  .emgithub-file .code-area .copy-btn-dark svg path {
    fill: var(--text-primary);
    opacity: 0.4;
  }

  .emgithub-file .code-area .copy-btn:hover svg path {
    fill: var(--text-primary);
    opacity: 1;
  }

  .copy-success {
    display: none;
    position: absolute;
    right: 4px;
    top: 54px;
    font-size: 14px;
    color: var(text-secondary);
    z-index: 1;
    font-family: JetBrains Mono, monospace;
  }

  .dark .copy-success {
    color: var(--text-primary);
  }

</style>

<style>
  .emgithub-file .html-area pre {
    padding: 0;
  }

  .emgithub-file .html-area .nb-output pre {
    padding: 16px;
  }

  .emgithub-file .html-area .nb-cell {
    position: relative;
  }

  .emgithub-file .html-area .nb-output:before,
  .emgithub-file .html-area .nb-input:before {
    position: absolute;
    font-family: monospace;
    color: #999;
    left: -7.5em;
    width: 7em;
    text-align: right;
    font-size: 13px;
  }

  .emgithub-file .html-area .nb-input:before {
    content: "In [" attr(data-prompt-number) "]:";
  }

  .emgithub-file .html-area .nb-output:before {
    content: "Out [" attr(data-prompt-number) "]:";
  }

  .emgithub-file .html-area.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  /* use where() for backward compatibility */
  :where(.emgithub-file .html-area.markdown-body) {
    max-height: ${maxHeight ? maxHeight + 'px' : 'none'};
    overflow-y: ${maxHeight ? 'auto' : 'visible'};
  }

  /* Reserve space for "In [1]", "Out [1]" */
  .emgithub-file .html-area.markdown-body .nb-notebook {
    padding-left: 65px;
  }

  @media (max-width: 767px) {
    .emgithub-file .html-area.markdown-body {
      padding: 15px;
    }
  }
</style>


<div id="${containerId}" class="emgithub-container">
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <div class="emgithub-file ${style}"
    style="display:none;">
    <div class="file-data">
      ${type === 'code' ? `<div class="code-area">
        ${showCopy ? `<a class="copy-btn copy-btn-${isDarkStyle ? 'dark' : 'light'}" href="javascript:void(0)"><svg
        width="16px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="4.25 2.25 15.5 19.5"
              className="w-4"
            >
              <path
                fill="var(--text-primary)"
                d="M19.53 8 14 2.47a.75.75 0 0 0-.53-.22H11A2.75 2.75 0 0 0 8.25 5v1.25H7A2.75 2.75 0 0 0 4.25 9v10A2.75 2.75 0 0 0 7 21.75h7A2.75 2.75 0 0 0 16.75 19v-1.25H17A2.75 2.75 0 0 0 19.75 15V8.5a.75.75 0 0 0-.22-.5Zm-5.28-3.19 2.94 2.94h-2.94V4.81Zm1 14.19A1.25 1.25 0 0 1 14 20.25H7A1.25 1.25 0 0 1 5.75 19V9A1.25 1.25 0 0 1 7 7.75h1.25V15A2.75 2.75 0 0 0 11 17.75h4.25V19ZM17 16.25h-6A1.25 1.25 0 0 1 9.75 15V5A1.25 1.25 0 0 1 11 3.75h1.75V8.5a.76.76 0 0 0 .75.75h4.75V15A1.25 1.25 0 0 1 17 16.25Z"
              />
            </svg></a> 
            <div class="copy-success">
              Copied!
            </div>`
        : ''}
        <pre class="language-${fileExtension} ${showLineNumbers ? 'line-numbers' : ''}"><code class="language-${fileExtension} ${showLineNumbers ? 'line-numbers' : ''}"></code></pre>
      </div>`: ''}

      ${type === 'markdown' || type === 'ipynb' ? `
      <div class="html-area markdown-body"></div>` : ''}

    </div>

    ${showFileMeta ? `<div class="file-meta file-meta-${isDarkStyle ? 'dark' : 'light'}"
      style="${showBorder ? '' : 'border:0'}">
      <a target="_blank" href="${rawFileURL}" style="float:right">view raw</a>
      <a target="_blank" href="${fileURL}">${decodeURIComponent(showFullPath ? filePath : pathSplit[pathSplit.length - 1])}</a>
      delivered <span class="hide-in-phone">with ❤ </span>by <a target="_blank" href="${serviceProvider}">emgithub</a>
    </div>`: ''
    }

  </div>

</div>

`);


  const promises = [];
  const fetchFile = fetch(rawFileURL).then((response) => {
    if (response.ok) {
      return response.text();
    }
    return Promise.reject(`${response.status}\nFailed to download ${rawFileURL}`);
  });
  promises.push(fetchFile);


  // Loading the external libraries
  // const HLJSURL = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/highlight.min.js";
  // const HLJSNumURL = "https://cdn.jsdelivr.net/npm/highlightjs-line-numbers.js@2.8.0/dist/highlightjs-line-numbers.min.js";
  // const loadHLJS = typeof hljs != "undefined" && typeof hljs.highlightElement != "undefined" ? Promise.resolve() : loadScript(HLJSURL);
  // // Always use hljs-num even if showLineNumbers is false for a consistent display
  // // hljs-num should be loaded only after hljs is loaded
  // const loadHLJSNum = loadHLJS.then(() => (typeof hljs.lineNumbersBlock != "undefined" ? Promise.resolve() : loadScript(HLJSNumURL)));
  // const loadHLJSStyle = fetch(`https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/${style}.min.css`)
  //   .then((response) => response.text())
  //   .then((text) => {
  //     insertStyle(scopeCss(text, '.' + styleClassName));
  //   });

  // promises.push(loadHLJSNum);

  const prismUrl = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js";
  const prismAutoLoader = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/autoloader/prism-autoloader.min.js";
  const prismLineNumbers = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0/plugins/line-numbers/prism-line-numbers.min.js";

  const loadPrism = typeof Prism != "undefined" ? Promise.resolve() : loadScript(prismUrl);

  const loadPrismAutoLoader = loadPrism.then(() => 
    typeof Prism.plugins?.autoloader != "undefined" ? Promise.resolve() : loadScript(prismAutoLoader)
  );

  const loadPrismLineNumbers = loadPrism.then(() => 
    typeof Prism.plugins?.lineNumbers != "undefined" ? Promise.resolve() : loadScript(prismLineNumbers)
  );

  promises.push(loadPrism, loadPrismAutoLoader, loadPrismLineNumbers);

  if (type === 'markdown' || type === 'ipynb') {
    const loadMarked = typeof marked != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/marked@4.0.18/marked.min.js');
    const loadMarkdownStyle = fetch(`https://cdn.jsdelivr.net/gh/sindresorhus/github-markdown-css@5.1.0/github-markdown-${isDarkStyle ? 'dark' : 'light'}.min.css`)
      .then((response) => response.text())
      .then((text) => {
        insertStyle(text);
        // TODO: `scopeCss` can not handle `github-markdown-css` well.
        // So currently you should not mix the usage of light and dark styles for markdown or jupyter files
        // (but use two different light (or dark) styles in a page are OK)
        // insertStyle(scopeCss(text, '.' + styleClassName));
      });

    const loadKatexStyle = fetch('https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css')
      .then((response) => response.text())
      .then((text) => {
        insertStyle(text.replaceAll('url(fonts/', 'url(https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/fonts/'));
      });

    promises.push(loadMarked);

    if (type === 'ipynb') {
      const loadAnsiUp = typeof AnsiUp != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/gh/drudru/ansi_up@4.0.4/ansi_up.min.js');
      const loadDOMPurify = typeof DOMPurify != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/dompurify@2.3.10/dist/purify.min.js');
      const loadNotebookjs = Promise.all([loadMarked, loadAnsiUp, loadDOMPurify])
        .then(() => (typeof nb != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/gh/jsvine/notebookjs@0.6.7/notebook.min.js')))
        .then(() => {
          nb.markdown = (text) => marked.parse(text, { baseUrl: rawDirectoryURL });
          const ansi_up = new AnsiUp();
          ansi_up.escape_for_html = false; // https://github.com/drudru/ansi_up/issues/66
          // bind 'this' to fix 'TypeError: this.append_buffer is not a function'
          nb.ansi = ansi_up.ansi_to_html.bind(ansi_up);
          // or: nb.ansi = (text) => ansi_up.ansi_to_html(text);
        });
      promises.push(loadNotebookjs);
    }
  }

  // Do the happy embedding
  Promise.allSettled(promises).then((result) => {
    const targetDiv = document.getElementById(containerId);
    const fetchSuccess = result[0].status === "fulfilled";

    if (type === 'code') {
      let codeText;
      if (fetchSuccess) {
        codeText = result[0].value;
        if (codeText[codeText.length - 1] === "\n") {
          // First remove the ending newline
          codeText = codeText.slice(0, -1);
        }

        let codeTextSplit = codeText.split("\n");
        if (startLine > 0) {
          codeTextSplit = codeTextSplit.slice(startLine - 1, endLine);
        }

        // Strip leading whitespace as otherwise we get pointless whitespace/indentation
        // for code snippets from the middle of functions (#22)
        while (true) {
          const firstChars = codeTextSplit.filter(s => s.length > 0).map(s => s[0]);
          if (new Set(firstChars).size == 1 && [' ', '\t'].includes(firstChars[0])) {
            // If all the lines begin with ' ' or '\t', strip the first char
            codeTextSplit = codeTextSplit.map(s => s.slice(1));
          } else {
            break;
          }
        }

        codeText = codeTextSplit.join("\n");
        // Then add the newline back
        codeText = codeText + "\n";
      } else {
        codeText = result[0].reason;
      }

      const codeTag = targetDiv.querySelector("code");
      codeTag.textContent = codeText;

      if (showCopy) {
        targetDiv.querySelector(".copy-btn").addEventListener('click', function (e) {
          e.preventDefault();
          e.cancelBubble = true;
          copyTextToClipboard(codeText);
        });
      }

      // hljs.highlightElement(codeTag);
      // hljs.lineNumbersBlock(codeTag, {
      //   singleLine: true,
      //   startFrom: (startLine > 0 && fetchSuccess) ? Number.parseInt(startLine) : 1
      // });

      Prism.highlightElement(codeTag);

      // Get the height of the pre and send it to parent window
      setTimeout(() => {
        const pre = targetDiv.querySelector("pre");
        const rect = pre.getBoundingClientRect();
        window.parent.postMessage(
          { action: "code-height", height: rect.height },
          "*"
        );
      }, 0);

    } else if (type === 'markdown') {
      targetDiv.querySelector(".html-area").innerHTML = fetchSuccess ? marked.parse(result[0].value, { baseUrl: rawDirectoryURL }) : result[0].reason;
    } else if (type === 'ipynb') {
      try {
        if (fetchSuccess) {
          const notebook = nb.parse(JSON.parse(result[0].value));
          const rendered = notebook.render();
          targetDiv.querySelector(".html-area").appendChild(rendered);
        } else {
          throw result[0].reason;
        }
      } catch (error) {
        // catch either the file downloading error or notebook parsing error
        targetDiv.querySelector(".html-area").innerText = error.toString();
      }
    }

    if (type === 'markdown' || type === 'ipynb') {
      targetDiv.querySelectorAll("pre code").forEach(codeTag => {
        if (type === 'ipynb' && codeTag.classList.contains("lang-undefined")) {
          codeTag.classList.remove("lang-undefined");
          codeTag.classList.add("lang-python");
        }
        hljs.highlightElement(codeTag);
      });

      // Load Katex and KatexAutoRender after Notebookjs, to avoid the logic bug in https://github.com/jsvine/notebookjs/blob/02f0b451a0095f839c28b267c568f40694ad9362/notebook.js#L265-L273
      // Specifically, in that code snippet, if `el.innerHTML` is assigned with something like `include <stdio.h>`,
      // then the value read from `el.innerHTML` will be `include <stdio.h></stdio.h>`,
      // So if `#include <stdio.h>` is in a Markdown code block, wrong results will be rendered
      const loadKatex = typeof katex != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.js');
      const loadKatexAutoRender = loadKatex.then(() => typeof renderMathInElement != "undefined" ? Promise.resolve() : loadScript('https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/contrib/auto-render.min.js'));
      loadKatexAutoRender.then(() => {
        renderMathInElement(targetDiv, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true },
          ],
          throwOnError: false
        });
      });
    }

    targetDiv.querySelector(".lds-ring").style.display = "none";
    targetDiv.querySelector(".emgithub-file").style.display = "block";
  });

})();



function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function insertStyle(text) {
  const styleElement = document.createElement('style');
  styleElement.textContent = text;
  document.head.appendChild(styleElement);
}

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);

  const copySuccess = document.querySelector(".copy-success");
  if (copySuccess) {
    copySuccess.style.display = "block";
    setTimeout(() => {
      copySuccess.style.display = "none";
    }, 2000);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed"; //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('fallbackCopyTextToClipboard: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}

function scopeCss(styleText, scopeSelector) {
  // Limit the scope of css by prepending a selector in each rule
  // based on https://stackoverflow.com/questions/3326494/parsing-css-in-javascript-jquery

  const doc = document.implementation.createHTMLDocument("");
  const styleElement = document.createElement("style");
  styleElement.textContent = styleText;
  doc.head.appendChild(styleElement);

  const rules = [];
  for (const rule of styleElement.sheet.cssRules) {
    if (rule.constructor.name === 'CSSStyleRule') {
      const cssText = rule.cssText;
      const delimiterIndex = cssText.indexOf('{');
      const cssSelector = cssText.slice(0, delimiterIndex);
      const cssBody = cssText.slice(delimiterIndex);
      const cssSelectorPrepended = cssSelector.split(',').map(s => `${scopeSelector} ${s.trim()}`).join(',');
      rules.push(`${cssSelectorPrepended} ${cssBody}`);
    } else if (rule.constructor.name === 'CSSMediaRule') {
      console.error("NotImplementedError", rule);
    } else {
      console.error("NotImplementedError", rule);
    }
  }
  return rules.join('\n');
}
