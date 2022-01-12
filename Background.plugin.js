/**
 * @name Background
 * @author Commandcracker
 * @authorLink https://github.com/Commandcracker
 * @version 1.0.2
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
      version: "1.0.2",
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

      const randomString = (length = 8) => {
          // Declare all characters
          let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
          // Pick characers randomly
          let str = '';
          for (let i = 0; i < length; i++) {
              str += chars.charAt(Math.floor(Math.random() * chars.length));
          }
      
          return str;
      };
      
      const Identifier = {
        "Random": randomString(16),
        "Prefix": "Background-Commandcracker"
      };

      const buildTag = (tag) => {
        return Identifier.Prefix + '-' + Identifier.Random + '-' + tag
      }

      return class Background extends Plugin {

        injectBackground() {
          const isYoutube = new RegExp('^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$').exec(this.settings.backgroundLink) != null

          var BackgroundCSS = `
            /**
             * @name ThemeFixer
             * @description ThemeFixerCSS for transparent themes
             * @author DevilBro
             * @version 1.0.3
             * @authorId 278543574059057154
             * @invite Jx3TjNS
             * @donate https://www.paypal.me/MircoWittrien
             * @patreon https://www.patreon.com/MircoWittrien
             */
            
            body,
            #app-mount,
            #app-mount .app-3xd6d0,
            #app-mount .app-2CXKsg,
            #app-mount .container-2RRFHK.fixClipping-3GOd_d,
            #app-mount .wrapper-3AZUiP,
            #app-mount .bg-1QIAus,
            #app-mount .layer-86YKbF,
            #app-mount .container-1NXEtd,
            #app-mount .privateChannels-oVe7HL,
            #app-mount .panels-3wFtMD > *,
            #app-mount .chat-2ZfjoI,
            #app-mount .container-3XgAHv,
            #app-mount .wrapper-3HVHpV,
            #app-mount .noChat-sb1z07,
            #app-mount .members-3WRCEx,
            #app-mount .members-3WRCEx > div,
            #app-mount .container-2cd8Mz,
            #app-mount .applicationStore-2nk7Lo,
            #app-mount .pageWrapper-2PwDoS,
            #app-mount .scrollerBase-_bVAAt,
            #app-mount .standardSidebarView-E9Pc3j,
            #app-mount .contentRegion-3HkfJJ {
              background-color: transparent;
            }
            #app-mount .children-3xh0VB:after {
              display: none;
            }
            #app-mount .wrapper-1_HaEi {
              background-color: rgba(0, 0, 0, 0.3);
            }
            #app-mount .container-ZMc96U.themed-Hp1KC_,
            #app-mount .sidebarRegion-1VBisG,
            #app-mount .sidebar-1tnWFu,
            #app-mount .panels-3wFtMD,
            #app-mount .membersWrap-3NUR2t,
            #app-mount .nowPlayingColumn-1eCBCN {
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
            .`+ buildTag("Video") +` {
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
              .`+ buildTag("Video") + ` {
                height: 300%;
                top: -100%;
              }
            }
            
            @media (max-aspect-ratio: 16/9) {
              .`+ buildTag("Video") + ` {
                width: 300%;
                left: -100%;
              }
            }`
          }

          const style = document.createElement('style');
          style.id = buildTag("CSS")
          style.innerHTML = BackgroundCSS
          document.head.appendChild(style);

          if (document.getElementsByClassName(buildTag("Video")).length == 0) {
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
              VideoElement.id         = buildTag("Video");
              VideoElement.className  = buildTag("Video");
              VideoElement.src        = videolink;

              AppMount.insertAdjacentElement("beforeend", VideoElement);

            } else {
              
              var VideoElement        = document.createElement("video");
              VideoElement.id         = buildTag("Video");
              VideoElement.className  = buildTag("Video");
              VideoElement.muted      = true;
              VideoElement.loop       = true;
              VideoElement.autoplay   = true;
              VideoElement.src        = this.settings.backgroundLink
  
              AppMount.insertAdjacentElement("beforeend", VideoElement);
            }
          }
        }

        deleteBackground() {
          var elem = document.querySelector("#" + buildTag("Video"));
          elem.parentNode.removeChild(elem);

          var elem = document.querySelector("#" + buildTag("CSS"));
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
