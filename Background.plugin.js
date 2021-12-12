/**
 * @name Background
 * @author Commandcracker
 * @authorLink https://github.com/Commandcracker
 * @version 1.0.0
 * @description Just a simple Background
 * @source https://github.com/Commandcracker/Better-Discord-Background
 * @updateUrl https://raw.githubusercontent.com/Commandcracker/Better-Discord-Background/main/Background.plugin.js
 */

/*@cc_on
@if (@_jscript)
	
  // Offer to self-install for clueless users that try to run this directly.
  var shell = WScript.CreateObject("WScript.Shell");
  var fs = new ActiveXObject("Scripting.FileSystemObject");
  var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
  var pathSelf = WScript.ScriptFullName;
  // Put the user at ease by addressing them in the first person
  shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
  if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
    shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
  } else if (!fs.FolderExists(pathPlugins)) {
    shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
  } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
    fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
    // Show the user where to put plugins in the future
    shell.Exec("explorer " + pathPlugins);
    shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
  }
  WScript.Quit();

@else@*/

module.exports = (() => {
  const config = {
    info: {
      name: "Background",
      authors: [
        {
          name: "Commandcracker",
          //discord_id: "",
          github_username: "Commandcracker",
          //twitter_username: "Commandcracker"
        }
      ],
      version: "1.0.0",
      description: "Just a simple Background",
      github: "https://github.com/Commandcracker/Better-Discord-Background",
      github_raw: "https://raw.githubusercontent.com/Commandcracker/Better-Discord-Background/main/Background.plugin.js"
    },
    /*changelog: [
      {
        title: "",
        type: "fixed",
        items: [
          ""
        ]
      }
    ],*/
    defaultConfig: [
      {
        type: "category",
        id: "effects",
        name: "Effects",
        collapsible: true,
        shown: false,
        settings: [
          {
            type: "slider",
            id: "brightness",
            name: "Brightness",
            value: 100,
            min: 0,
            max: 100
          },
          {
            type: "slider",
            id: "opacity",
            name: "Opacity",
            value: 100,
            min: 0,
            max: 100
          },
          {
            type: "slider",
            id: "saturation",
            name: "Saturation",
            value: 100,
            min: 0,
            max: 100
          },
          {
            type: "slider",
            id: "blur",
            name: "Blur",
            value: 0,
            min: 0,
            max: 1
          }
        ]
      },
      {
        type: "textbox",
        id: "backgroundLink",
        name: "Background Link",
        value: "https://mylivewallpapers.b-cdn.net/wp-content/uploads/Nature/PREVIEW-Dusk.mp4"
      }
    ]
  };

  return !global.ZeresPluginLibrary ? class {
    constructor() { this._config = config; }
    getName() { return config.info.name; }
    getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
    getDescription() { return config.info.description + " **Install [ZeresPluginLibrary](https://betterdiscord.app/Download?id=9) and restart discord to use this plugin!**"; }
    getVersion() { return config.info.version; }
    load() {
      BdApi.showConfirmationModal("Library plugin is needed",
        [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`], {
        confirmText: "Download",
        cancelText: "Cancel",
        onConfirm: () => {
          require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
            if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
            await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
          });
        }
      }
      );
    }
    start() { }
    stop() { }
  } : (([Plugin, Api]) => {
    const plugin = (Plugin, Api) => {
      const VideoElementIdentifier = "Commandcracker-Background"
      return class Background extends Plugin {

        injectBackground() {
          const isYoutube = new RegExp('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$').exec(this.settings.backgroundLink) != null

          var BackgroundCSS = `
            /* Transparency */

            body,
            #app-mount,
            #app-mount .app-1q1i1E,
            #app-mount .app-2rEoOp /* Everything */,
            #app-mount .container-16j22k.fixClipping-3qAKRb,
            #app-mount .wrapper-1prNyd,
            #app-mount .bg-h5JY_x,
            #app-mount .layer-3QrUeG,
            #app-mount .container-3w7J-x,
            #app-mount .privateChannels-1nO12o,
            #app-mount .panels-j1Uci_ > *,
            #app-mount .chat-3bRxxu,
            #app-mount .wrapper-3vR61M,
            #app-mount .noChat-9aipKz,
            #app-mount .members-1998pB,
            #app-mount .members-1998pB > div,
            #app-mount .container-1D34oG /* Friends */,
            #app-mount .applicationStore-1pNvnv /* Nitro */,
            #app-mount .pageWrapper-1PgVDX,
            #app-mount .scrollerBase-289Jih,
            #app-mount .standardSidebarView-3F1I7i,
            #app-mount .contentRegion-3nDuYy {
              background-color: transparent;
            }
            #app-mount .children-19S4PO:after {
              display: none;
            }
            #app-mount .wrapper-3NnKdC /* Server List */ {
              background-color: rgba(0, 0, 0, 0.3);
            }
            #app-mount .container-1r6BKw.themed-ANHk51,
            #app-mount .sidebarRegion-VFTUkN,
            #app-mount .sidebar-2K8pFh,
            #app-mount .panels-j1Uci_,
            #app-mount .membersWrap-2h-GB4,
            #app-mount .nowPlayingColumn-2sl4cE {
              background-color: rgba(0, 0, 0, 0.2);
            }

            /* Now Playing / Active Now */
            /* Hover Card */
            .theme-dark .outer-1AjyKL.active-1xchHY,
            .theme-dark .outer-1AjyKL.interactive-3B9GmY:hover {
                background-color: rgba(24, 25, 28, 0.25);
            }
            .theme-light .outer-1AjyKL.active-1xchHY,
            .theme-light .outer-1AjyKL.interactive-3B9GmY:hover {
                background-color: rgba(242, 243, 245, 0.2);
            }

            /* Card background */
            .theme-dark .inset-3sAvek {
              background-color: rgba(47, 49, 54, 0.25);
            }
            .theme-light .inset-3sAvek {
              background-color: rgba(235, 237, 239, 0.25);
            }
            
            /* Call background */
            .wrapper-2qzCYF.minimum-28Z35l  {
              background-color: transparent;
            }

            /* Screen Share */
            .wrapper-2qzCYF,
            .callContainer-36WRfH {
                background-color: transparent;
            }

            /* Blur */
            .app-2rEoOp {
              backdrop-filter: blur(`+ this.settings.effects.blur + `rem);
            }

            /* Background Video */
            .`+ VideoElementIdentifier + ` {
              background: url("`+ this.settings.backgroundLink + `");
              background-repeat: no-repeat;
              background-size: cover;

              width: 100vw;
              height: 100vh;
              object-fit: cover;
              position: fixed;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
              z-index: -1;

              filter: brightness(`+this.settings.effects.brightness+`%) opacity(`+this.settings.effects.opacity+`%) saturate(`+this.settings.effects.saturation+`%);
            }

            .theme-dark {
                --background-primary:         rgba(54, 57, 63, 0);
                --background-secondary:       rgba(47, 49, 54, 0.25);
                --background-secondary-alt:   rgba(41, 43, 47, 0.25);
                --background-tertiary:        rgba(32, 34, 37, 0.25);
                --channeltextarea-background: rgba(64, 68, 75, 0.25);
                --scrollbar-auto-track: hsl(210,calc(var(--saturation-factor, 1)*9.8%),20%,.5);
                --background-floating: rgba(24, 25, 28, 0.5);
            }
  
            .theme-light {
                --background-primary:         rgba(255, 255, 255, 0);
                --background-secondary:       rgba(242, 243, 245, 0.25);
                --background-secondary-alt:   rgba(235, 237, 239, 0.25);
                --background-tertiary:        rgba(227, 229, 232, 0.25);
                --channeltextarea-background: rgba(235, 237, 239, 0.25);
                --scrollbar-auto-track: rgba(242, 242, 242, 0.5);
                --background-floating: rgba(255, 255, 255, 0.5);
            }`

          if (isYoutube) {
            BackgroundCSS += `

            @media (min-aspect-ratio: 16/9) {
              .`+ VideoElementIdentifier + ` {
                height: 300%;
                top: -100%;
              }
            }
            
            @media (max-aspect-ratio: 16/9) {
              .`+ VideoElementIdentifier + ` {
                width: 300%;
                left: -100%;
              }
            }`
          }

          const style = document.createElement('style');
          style.id = "extra-css"
          style.innerHTML = BackgroundCSS
          document.head.appendChild(style);

          if (document.getElementsByClassName(VideoElementIdentifier).length == 0) {
            var AppMount = document.getElementById("app-mount");

            if (isYoutube) {
              var videolink = this.settings.backgroundLink

              if (videolink.search("playlist?") > -1) {
                let videoPL = videolink.substring(videolink.search("playlist") + 14, videolink.length);
                videolink = videolink.replace("playlist?list=", "embed/videoseries?list=");
                videolink = "https://www.youtube-nocookie.com/embed/videoseries?list=";
                videolink += videoPL;
                videolink += "&controls=0&iv_load_policy=3&mute=1&showinfo=0&rel=0&autoplay=1&loop=1";
              }

              if (videolink.search("watch") > -1) {
                let videoID = videolink.substring(videolink.search("watch") + 8, videolink.search("watch") + 19);
                videolink = "https://www.youtube-nocookie.com/embed/";
                videolink += videoID;
                videolink += "?controls=0&iv_load_policy=3&mute=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=";
                videolink += videoID;
              }

              var VideoElement = document.createElement("iframe");
              VideoElement.id = VideoElementIdentifier;
              VideoElement.className = VideoElementIdentifier;
              VideoElement.src = videolink;

              AppMount.insertAdjacentElement("beforeend", VideoElement);

            } else {
              
              var VideoElement        = document.createElement("video");
              VideoElement.id         = VideoElementIdentifier;
              VideoElement.className  = VideoElementIdentifier;
              VideoElement.muted      = true;
              VideoElement.loop       = true;
              VideoElement.autoplay   = true;
              VideoElement.src        = this.settings.backgroundLink
  
              AppMount.insertAdjacentElement("beforeend", VideoElement);
            }
          }
        }

        deleteBackground() {
          var elem = document.querySelector("#" + VideoElementIdentifier);
          elem.parentNode.removeChild(elem);

          var elem = document.querySelector("#extra-css");
          elem.parentNode.removeChild(elem);
        }

        onStart() {
          this.injectBackground()
        }

        onStop() {
          this.deleteBackground()
        }

        getSettingsPanel() {
          const panel = this.buildSettingsPanel();
          panel.addListener(this.updateSettings.bind(this));
          return panel.getElement();
        }

        updateSettings(group, id, value) {
          this.deleteBackground()
          this.injectBackground()
        }
      }
    };
    return plugin(Plugin, Api);
  })(global.ZeresPluginLibrary.buildPlugin(config));
})();
