//@ts-check

class ApplinksPanelOptionsGraphicUtils {
    static userIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>`;
    static cloudUpdateIcon = `
<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960"  ><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"/></svg>`;
    static cloudCompleteIcon = `
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 -960 960 960"  ><path d="m414-280 226-226-58-58-169 169-84-84-57 57 142 142ZM260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>`;
    static cloudErrorIcon = `
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 -960 960 960"  ><path d="M792-56 686-160H260q-92 0-156-64T40-380q0-77 47.5-137T210-594q3-8 6-15.5t6-16.5L56-792l56-56 736 736-56 56ZM260-240h346L284-562q-2 11-3 21t-1 21h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm185-161Zm419 191-58-56q17-14 25.5-32.5T840-340q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-27 0-52 6.5T380-693l-58-58q35-24 74.5-36.5T480-800q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 39-15 72.5T864-210ZM593-479Z"/></svg>`;
    static userLoggedIcon = `
<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 -960 960 960"  ><path d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/></svg>`;
    static xIcon = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.41602 3.625L13.4151 13.625" stroke="#979699" stroke-linecap="round"></path><path d="M13.415 3.625L3.41596 13.625" stroke="#979699" stroke-linecap="round"></path></svg>`;
    static logoutIcon = `<svg   viewBox="0 0 24 24"  focusable="false" class=" NMm5M"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>`;
    static helpIcon = `<svg class="t7" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000" focusable="false"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path></svg>`;
    static settingsIcon = `<svg class="Xy" xmlns="http://www.w3.org/2000/svg"    viewBox="0 0 24 24"><path d="M13.85 22.25h-3.7c-.74 0-1.36-.54-1.45-1.27l-.27-1.89c-.27-.14-.53-.29-.79-.46l-1.8.72c-.7.26-1.47-.03-1.81-.65L2.2 15.53c-.35-.66-.2-1.44.36-1.88l1.53-1.19c-.01-.15-.02-.3-.02-.46 0-.15.01-.31.02-.46l-1.52-1.19c-.59-.45-.74-1.26-.37-1.88l1.85-3.19c.34-.62 1.11-.9 1.79-.63l1.81.73c.26-.17.52-.32.78-.46l.27-1.91c.09-.7.71-1.25 1.44-1.25h3.7c.74 0 1.36.54 1.45 1.27l.27 1.89c.27.14.53.29.79.46l1.8-.72c.71-.26 1.48.03 1.82.65l1.84 3.18c.36.66.2 1.44-.36 1.88l-1.52 1.19c.01.15.02.3.02.46s-.01.31-.02.46l1.52 1.19c.56.45.72 1.23.37 1.86l-1.86 3.22c-.34.62-1.11.9-1.8.63l-1.8-.72c-.26.17-.52.32-.78.46l-.27 1.91c-.1.68-.72 1.22-1.46 1.22zm-3.23-2h2.76l.37-2.55.53-.22c.44-.18.88-.44 1.34-.78l.45-.34 2.38.96 1.38-2.4-2.03-1.58.07-.56c.03-.26.06-.51.06-.78s-.03-.53-.06-.78l-.07-.56 2.03-1.58-1.39-2.4-2.39.96-.45-.35c-.42-.32-.87-.58-1.33-.77l-.52-.22-.37-2.55h-2.76l-.37 2.55-.53.21c-.44.19-.88.44-1.34.79l-.45.33-2.38-.95-1.39 2.39 2.03 1.58-.07.56a7 7 0 0 0-.06.79c0 .26.02.53.06.78l.07.56-2.03 1.58 1.38 2.4 2.39-.96.45.35c.43.33.86.58 1.33.77l.53.22.38 2.55z"></path><circle cx="12" cy="12" r="3.5"></circle></svg>`;
    /**
     *
     * @param {string} id
     * @param {ApplinksPanelOptions} panelOption
     **/
    static getCss = (id, panelOption) => {
        const popoverLeft = 6 + panelOption.customModifiers.x;
        const popoverTop = 45 +
            ((panelOption.customModifiers.sizeModifier / 100) * 40 - 40) +
            panelOption.customModifiers.y;
        const roundedPanelSizeChange = panelOption.panelType ===
        ApplinksPanelOptions.PanelType.rounded ? -2 : 0;
        const textRoundedModifier = panelOption.panelType ===
        ApplinksPanelOptions.PanelType.rounded ? 0.7 : 1;
        return `
    :root {
       --popover-transition-duration: 0.1s;
    }
    #${id}-wrapper {
        width: ${(40 + roundedPanelSizeChange) *
        (panelOption.customModifiers.sizeModifier / 100)}px;
        height: ${(40 + roundedPanelSizeChange) *
        (panelOption.customModifiers.sizeModifier / 100)}px;
        background-color: ${panelOption.customModifiers.mainBgColor};
        background-opacity: 0.5;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        left: ${panelOption.customModifiers.x}px;
        top: ${panelOption.customModifiers.y}px;
        border-radius: ${panelOption.panelType ===
        ApplinksPanelOptions.PanelType.rounded ? '50%' : '0 0 2px 0'} ;
        z-index: 1000;
         button {
          outline: none;
          border: none;
        }
    }
    
    #${id}-main-user-button {
        display: flex;
        justify-content: center;
        align-items: center;
      
    }
    .${id}-main-icon {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: ${panelOption.customModifiers.iconsBgColor} ;
        width: ${30 * (panelOption.customModifiers.sizeModifier / 100)}px;
        height: ${30 * (panelOption.customModifiers.sizeModifier / 100)}px;
        svg {
          width: ${20 * (panelOption.customModifiers.sizeModifier / 100)}px;
          height: ${20 * (panelOption.customModifiers.sizeModifier / 100)}px;
        }
        box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.1); 
        &:hover {
            box-shadow: 0 0 2px 2px rgba(50, 50, 50, 0.2);
        }
        transition: box-shadow 0.2s, opacity 0.2s; 
    }
    .${id}-main-icon:not(#${id}-cloud-complete) svg {
        transition: box-shadow 0.2s, opacity 0.05s; 
        opacity: 0;
     }
    .${id}-main-icon.active:not(#${id}-cloud-complete) svg {
       opacity: 1;
    }
  
    #${id}-user-initials {
        color : black;
        padding-top: ${panelOption.panelType === ApplinksPanelOptions.PanelType.rounded ?
            (panelOption.customModifiers.sizeModifier / 100) * 1.3 : '0'}px;
        font-size: ${(panelOption.customModifiers.sizeModifier / 100) *
        textRoundedModifier}rem;
    }
    #${id}-popover {
        position: fixed;
        padding: 0;
        border-radius: 7px;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
        border: 0px solid rgba(0, 0, 0, 0.2);
        background-color: ${panelOption.customModifiers.menuColor};
        font-size: 0.9rem;
        font-family: sans-serif;
        width: 180px; 
       
        left: ${popoverLeft}px;
        top: ${popoverTop}px;
        overflow: hidden;
       
       #${id}-popover-login-name {
         padding: 0px 20px;
         font-weight: bold;
       }
        .applinks-panel-popover-content {
                padding 0;
                padding-bottom: 10px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: start;
                justify-content: center;
             
                span {
                   
                    margin-bottom: 10px;
                }
                .applinks-panel-menu {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .applinks-panel-menu-item {
                    
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        
                      
                        padding: 10px 5px;
                        cursor: pointer;
                        transition: none;
                        transition-delay: 0.001s;
                        &:hover {
                            background-color: rgba(0,0, 0, 0.07);
                        }
                        div {
                            display: flex;
                            flex-direction: row;
                            gap: 10px;
                            align-items: center;
                            justify-content: start;
                            gap 10px;
                            padding: 0 20px ;
                        }
                        svg {
                            width: 22px;
                            height: 22px;
                            margin-right: 5px;
                        }
                    }
                }
                
        }
        .close-container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0px; 
            div.close-container-button {
                margin : 5px;
                padding: 5px;
                cursor: pointer;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                transition: background-color 0.1s;
                background-color: transparent;
                transition-delay: 0s;
                &:hover {
                   transition: none;
                   transition-delay: 0s;
                   background-color: rgba(0,0, 0, 0.07);;
                }
            }
        }
    }
    #${id}-popover-close {
    
    }
    
    
#${id}-popover[popover]:popover-open {

    opacity: 1;
    transform: scale(1);

}
body [popover] {
    inset:unset;
}

#${id}-popover[popover] {

 
    /* Final state of the exit animation */
    opacity: 0; 
    transform: scale(.8);

    transition:
            opacity var(--popover-transition-duration),
            transform var(--popover-transition-duration),
            overlay var(--popover-transition-duration) allow-discrete,
            visibility var(--popover-transition-duration) allow-discrete,
            display var(--popover-transition-duration) allow-discrete;
    /* Equivalent to
    transition: all 0.4s allow-discrete; */


    }

   /* Needs to be after the previous .popoverClass[popover]:popover-open rule
    to take effect, as the specificity is the same */
   @starting-style {
    #${id}-popover[popover]:popover-open {
        opacity: 0;
        transform: scale(0);
    }
    }
    #${id}-message-info {
      position: fixed;
      left: ${45 + ((panelOption.customModifiers.sizeModifier / 100) * 40 - 40) +
        panelOption.customModifiers.x}px;
      padding: 0;
      border-radius: 7px;
      box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
      border: 0px solid rgba(0, 0, 0, 0.2);
      background-color: ${panelOption.customModifiers.menuColor};
      font-size: 0.9rem;
      font-family: sans-serif;
      display: none;
      flex-direction: row;
      .message-text {
        padding: 10px 20px;
      }
      
      .close-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 0px; 
            div.close-container-button {
                margin : 5px;
                padding: 5px;
                cursor: pointer;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                transition: background-color 0.1s;
                background-color: transparent;
                transition-delay: 0s;
                &:hover {
                   transition: none;
                   transition-delay: 0s;
                   background-color: rgba(0,0, 0, 0.07);;
                }
            }
        }
      
    }

    `;
    };
}

/**
 * @typedef  {"not-logged-in" | "updating" | "updateComplete" | "error" | "logged-in" | "error-please-relogin"}  AppLinkPanelStatusDisplay
 */

class ApplinksPanelOptions {
    static Position = {
        bottomLeft: 'bottomLeft',
        bottomRight: 'bottomRight',
        topLeft: 'topLeft',
        topRight: 'topRight',
    };
    static PanelType = {
        classic: 'classic', rounded: 'rounded',
    };
    static userIcon = {
        icon: 'icon', initials: 'initials',
    };

    /**
     * @constructor
     * @param {{position? :keyof ApplinksPanelOptions.Position,
     *  panelType?: keyof ApplinksPanelOptions.PanelType
     *  userIcon?: keyof ApplinksPanelOptions.userIcon
     *  x?: number,
     *  y?: number,
     *  sizeModifier?: number,
     *  color?: string,
     *  mainBgColor?: string,
     *  menuColor?: string,
     *  iconsBgColor?: string,
     *  textColor?: string
     * }  } props
     */
    constructor({
                    panelType,
                    menuColor,
                    mainBgColor,
                    iconsBgColor,
                    position,
                    userIcon,
                    x,
                    y,
                    sizeModifier,
                    color,
                    textColor,
                } = {}) {
        this.position = position || ApplinksPanelOptions.Position.topLeft;
        this.panelType = panelType || ApplinksPanelOptions.PanelType.classic;
        this.userIcon = userIcon || ApplinksPanelOptions.userIcon.initials;
        if (color === '#000000') {
            color = 'lightgray';
        }
        if (color && !mainBgColor && panelType !==
            ApplinksPanelOptions.PanelType.rounded) {
            mainBgColor =
                mainBgColor || ApplinksPanelOptions.makeHexColorLighter(color, 20);
            iconsBgColor =
                iconsBgColor || ApplinksPanelOptions.makeHexColorLighter(color, 10);
            textColor = textColor || ApplinksPanelOptions.makeHexColorLighter(color, -20);
            // menuColor = menuColor || ApplinksPanelOptions.makeHexColorLighter(color, 10);
        } else if (panelType === ApplinksPanelOptions.PanelType.rounded) {
            iconsBgColor = mainBgColor || iconsBgColor || color || 'lightgray';
            mainBgColor = 'transparent';
        }
        this.customModifiers = {
            x: +x || 0,
            y: +y || 0,
            sizeModifier: +sizeModifier || 100,
            color: color || 'lightgray',
            mainBgColor: mainBgColor || 'lightgray',
            iconsBgColor: iconsBgColor || 'aliceblue',
            menuColor: menuColor || '#FAF9F6',
            textColor: textColor || 'black',
        };
    }

    static makeHexColorLighter = (/** @type {string} */ color, /** @type {number} */ percent) => {
        let num = parseInt(color.slice(1), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            B = ((num >> 8) & 0x00ff) + amt,
            G = (num & 0x0000ff) + amt;

        return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 + (G < 255 ? (G < 1 ? 0 : G) : 255))
            .toString(16)
            .slice(1)}`;
    };
}

export class ApplinksPanel {
    static Options = ApplinksPanelOptions;
    #status = 'not-logged-in';
    #applinksPanelId = 'app-links-Panel-Id';

    #returnToUserInterval = null;

    /** @type {HTMLDivElement}     */
    #panelElement;

    /**
     * @param {ApplinksPanelOptions} [panelOptions]
     */
    constructor(panelOptions) {
        this.panelOptions = panelOptions || new ApplinksPanelOptions();

        this.#panelElement = this.#createPanelElement();

        this.#addCSS(ApplinksPanelOptionsGraphicUtils.getCss(this.#applinksPanelId, this.panelOptions));
    }

    actionCallBack = (/** @type {string} */ action) => {
        if (action === 'logout') {
        }
    };
    #commitAction = (/** @type {string} */ action) => {
        this.actionCallBack(action);
    };

    /**
     *
     * @param {AppLinkPanelStatusDisplay} status
     * @param {UserData} [userData]
     */
    setStatus(status, userData = null) {
        const allIcons = ['user-logged', 'cloud-error', 'cloud-complete', 'cloud-update',
                          'unloged-user'];
        const showOnly = (/** @type {string} */ icon) => {
            allIcons.forEach((i) => {
                const el = document.getElementById(`${this.#applinksPanelId}-${i}`);
                if (!el) {
                    return;
                }
                if (i === icon) {
                    el.style.display = 'flex';
                    setTimeout(() => {
                        el.classList.add('active');
                    }, 100);
                } else {
                    el.style.display = 'none';
                    el.classList.remove('active');
                }
            });
        };

        this.#status = status;
        // status = 'error-please-relogin';
        switch (status) {
            case 'not-logged-in':
                showOnly('unloged-user');
                break;
            case 'updating':
                showOnly('cloud-update');
                break;
            case 'updateComplete':
                showOnly('cloud-complete');
                clearTimeout(this.#returnToUserInterval);
                this.#returnToUserInterval = setTimeout(() => {
                    this.setStatus('logged-in');
                }, 2000);

                break;
            case 'error':
                showOnly('cloud-error');
                break;
            case 'logged-in':
                showOnly('user-logged');
                const userInitials = document.getElementById(`${this.#applinksPanelId}-user-initials`);
                const userNameInMenu = document.getElementById(`${this.#applinksPanelId}-popover-login-name`);
                const errorMessageElement = document.querySelector(`#${this.#applinksPanelId}-message-info`);
                // @ts-ignore
                errorMessageElement.style.display = 'none';

                if (userInitials.innerHTML) {
                    return;
                }

                const name = userData?.fullName || userData?.username || 'User';
                const initials = name
                    .split(' ')
                    .map((n) => n[0])
                    .join('');
                userInitials.innerHTML = initials;

                userNameInMenu.innerHTML = `${name}`;

                break;
            case 'error-please-relogin':
                showOnly('cloud-error');
                const messageElement = document.querySelector(`#${this.#applinksPanelId}-message-info`);
                // @ts-ignore
                messageElement.style.display = 'flex';
                setTimeout(() => {
                    this.setStatus('not-logged-in');
                }, 1000);

                break;
            default:
        }
    }

    #addCSS = (/** @type {string} */ css) => {
        document.head.appendChild(document.createElement('style')).innerHTML = css;
    };

    #createPanelElement() {
        if (this.#panelElement) return;
        const element = document.createElement('div');

        const userIcon = this.panelOptions.userIcon === 'initials' ?
            `<div id="${this.#applinksPanelId}-user-initials"></div>` :
            ApplinksPanelOptionsGraphicUtils.userLoggedIcon;

        const innerHtml = `
 
        <div id="${this.#applinksPanelId}-wrapper" >
            <div popover  id="${this.#applinksPanelId}-popover">
        
            <div class="close-container">
             <div> <div id="${this.#applinksPanelId}-popover-login-name"> Logged in </div> </div>
             <div role="button" class="close-container-button" id="${this.#applinksPanelId}-popover-close">${ApplinksPanelOptionsGraphicUtils.xIcon}</div>
            </div>
           
            <div class="applinks-panel-popover-content">  
                
                <div class="applinks-panel-menu">   
                <div role="button"  class="applinks-panel-menu-item" id="${this.#applinksPanelId}-button-account"> 
                 <div> ${ApplinksPanelOptionsGraphicUtils.settingsIcon} Settings</div> </div>
                <div role="button"  class="applinks-panel-menu-item" id="${this.#applinksPanelId}-button-help"> 
                <div> ${ApplinksPanelOptionsGraphicUtils.helpIcon} Support </div> </div>
                <div role="button"  class="applinks-panel-menu-item" id="${this.#applinksPanelId}-button-logout"> <div> ${ApplinksPanelOptionsGraphicUtils.logoutIcon} Logout </div> </div>
                </div>
            </div>
        </div> 
         <button style="background-color: transparent" popovertarget="${this.#applinksPanelId}-popover" popovertargetaction="toggle">
        <div id="${this.#applinksPanelId}-main-user-button" aria-haspopup="true" >
            
            <div id="${this.#applinksPanelId}-unloged-user"  
              class="${this.#applinksPanelId}-main-icon active" style="display: flex"> 
              ${ApplinksPanelOptionsGraphicUtils.userIcon}
            </div>
           
            <div id="${this.#applinksPanelId}-cloud-update"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.cloudUpdateIcon}
            </div>
              <div id="${this.#applinksPanelId}-cloud-complete"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.cloudCompleteIcon}
            </div> 
              <div id="${this.#applinksPanelId}-cloud-error"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${ApplinksPanelOptionsGraphicUtils.cloudErrorIcon}
            </div>
              <div id="${this.#applinksPanelId}-user-logged"  class="${this.#applinksPanelId}-main-icon"
            style="display: none">
              ${userIcon}
            </div>
        
        </div>
          </button>
          <div id="${this.#applinksPanelId}-message-info" class="${this.#applinksPanelId}-message-info"> 
         <div class="message-text" id="${this.#applinksPanelId}-message-content"> You're not connected. Please login </div>
           <div class="close-container"> 
             <div role="button" class="close-container-button" id="${this.#applinksPanelId}-message-close">
${ApplinksPanelOptionsGraphicUtils.xIcon}</div>

            </div>
          </div>
        </div>`;
        element.innerHTML = innerHtml;
        document.body.appendChild(element);
        this.#attachHandlers();

        return element;
    }

    #attachHandlers = () => {
        const mainElement = document.querySelector(`#${this.#applinksPanelId}-wrapper`);
        const popover = document.querySelector(`#${this.#applinksPanelId}-popover`);
        const messageElement = document.querySelector(`#${this.#applinksPanelId}-message-info`);

        mainElement?.addEventListener('click', (ev) => {
            if (this.#status === 'not-logged-in') {
                ev.preventDefault();
                ev.stopPropagation();
                this.actionCallBack('login');
            }
        });

        document.querySelector(`#${this.#applinksPanelId}-popover-close`).addEventListener('click', () => {
            // @ts-ignore
            popover.hidePopover();
        });
        document.querySelector(`#${this.#applinksPanelId}-message-close`).addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            // @ts-ignore
            messageElement.style.display = 'none';
        });

        ['account', 'help', 'logout'].forEach((id) => {
            document.querySelector(`#${this.#applinksPanelId}-button-${id}`).addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                this.#commitAction(id);
                // @ts-ignore
                popover.hidePopover();
            });
        });
    };
}

// const panel = new ApplinksPanel();

/**
 * @typedef UserData
 * @property { string } username
 * @property  { string } fullName
 * @property  { string } id
 * @property  { string } token
 * @property  { string } refreshToken
 */

/**
 * @typedef RecordData
 * @property { string } app_data
 * @property { string } app_name
 * @property { string } app_id
 * @property  { string } message
 * @property  { string } saved_date
 * @property  { string } user_id
 */

/**
 * @typedef LoginData
 * @property  { UserData } userData
 * @property { RecordData= } recordData
 */

/**
 * @typedef ApplinksClientOptions
 * @property { boolean } useClientPanel
 * @property { boolean } useLocalStorage
 * @property { number } debaunceTime
 * @property { APPLinkUtils | any } appLinkUtils
 * @property { ApplinksPanelOptions | any } panelOptions
 */
export class APPLinkUtils {
    static #configs = {
        baseUrl: 'https://apps-links.web.app', // 'http://localhost:5173', https://apps-links.web.app
        userLoginHtmlPath: 'site/app-login',
        userHelpHtmlPath: 'site/support',
        userAccountHtmlPath: 'site/account',
        recordsApiPath: 'api/appRecord',
        logoutApiPath: 'api/logout',
        refreshApiPath: 'api/refreshToken',
        localStorageUserData: 'app-links-user-data',
        localStorageConfigData: 'app-links-config-data',
        tokenSoonToExpireHeader: 'Expires',
    };
    static Success = 'success';
    static Error = 'error';

    constructor() {}

    static get AuthError() {
        class AuthError extends Error {
            /**
             * @param {string} message
             */
            constructor(message) {
                super(message);
            }
        }

        return AuthError;
    }

    static get htmlLoginUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userLoginHtmlPath}`;
    }

    static get recordUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.recordsApiPath}`;
    }

    static get logoutUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.logoutApiPath}`;
    }

    static get helpHtmlPath() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userHelpHtmlPath}`;
    }

    static get refreshUrl() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.refreshApiPath}`;
    }

    static get accountHtmlPath() {
        return `${APPLinkUtils.#configs.baseUrl}/${APPLinkUtils.#configs.userAccountHtmlPath}`;
    }

    /**
     * @param {{ baseUrl: string; userLoginHtmlPath: string; recordsApiPath: string; localStorageTokenKey: string; }} configs
     */
    static setConfigs(configs) {
        APPLinkUtils.#configs = {...APPLinkUtils.#configs, ...configs};
    }

    /**
     * @param {any} userData
     */
    static storeUserDataToLocalStorage(userData) {
        localStorage.setItem(APPLinkUtils.#configs.localStorageUserData, JSON.stringify(userData));
    }

    static removeUserDataFromLocalStorage() {
        localStorage.removeItem(APPLinkUtils.#configs.localStorageUserData);
    }

    static getUserDataFromLocalStorage() {
        return localStorage.getItem(APPLinkUtils.#configs.localStorageUserData);
    }

    /**
     * @param {Headers} headers
     */
    static hasTokenExpiryHeader(headers) {
        return !!headers.get(APPLinkUtils.#configs.tokenSoonToExpireHeader);
    }

    /**
     *
     * @param {string} url
     * @param  {Record<string,any>} data
     * @param  {string} token
     * @return { Promise<{ body: any; status: number; headers: Headers; }>}
     */
    static async PostData(url = '', data = {}, token) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = 'Token ' + token;
        }
        const response = await fetch(url, {
            method: 'POST', mode: 'cors', cache: 'no-cache', // credentials: 'same-origin',
            headers: headers, referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({Data: data}),
        });

        return {
            body: await response.json(),
            status: response.status,
            headers: response.headers,
        };
    }

    /**
     * @param url
     * @param {string} token
     */
    static async GetData(url = '', token) {
        try {
            const headers /** @type {HeadersInit | any} */ = {
                'Content-Type': 'application/json',
            };
            if (token) {
                headers['Authorization'] = 'Token ' + token;
            }

            const response = await fetch(url, {
                headers: headers, mode: 'cors', cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer',
            });

            const asJson = await response.json();
            return {
                body: asJson, status: response.status, headers: response.headers,
            };
        } catch (err) {
            throw new Error('cannot get data' + err.toString());
        }
    }

    /**
     *
     * @param {string} url
     * @param  {string} refreshToken
     * @param  {string} token
     * @return { Promise<{ body: any; status: number; headers: Headers; }>}
     */
    static async RequestTokenRefresh(url = '', refreshToken, token) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = 'Token ' + token;
        }
        const response = await fetch(url, {
            method: 'POST', mode: 'cors', cache: 'no-cache', // credentials: 'same-origin',
            headers: headers, referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                applinksAuthToken: token, refreshToken: refreshToken,
            }),
        });

        return {
            body: await response.json(),
            status: response.status,
            headers: response.headers,
        };
    }

    /**
     * @param {{ Email: any; FullName: any; UID: any; }} userData
     * @param {any} TokenKey
     * @param {string | null} refreshToken
     * @returns {UserData}
     */
    static serializeUserData(userData, TokenKey, refreshToken) {
        return {
            username: userData.Email,
            fullName: userData.FullName,
            id: userData.UID,
            token: TokenKey,
            refreshToken: refreshToken,
        };
    }

    /**
     * @param {{ Data: any; AppId: any; message: any; Timestamp: any; UserId: any; }} recordData
     * @param {{ Name: any; }} appData
     * @returns {RecordData}
     */
    static serializeRecordData(recordData, appData = {Name: ''}) {
        return {
            app_data: recordData.Data,
            app_name: appData.Name,
            app_id: recordData.AppId,
            message: recordData.message || '',
            saved_date: recordData.Timestamp,
            user_id: recordData.UserId,
        };
    }

    _debug_get_constants() {
        return APPLinkUtils.#configs;
    }
}

export class APPLinksClient {
    static Messages = {
        UserIsSet: 'UserWasSet', UserNotSet: 'UserWasNotSet',
    };

    static AuthError = APPLinkUtils.AuthError;
    static ApplinksClientEvents = {
        UserLoggedIn: 'UserLoggedIn',
        UserLoggedOut: 'UserLoggedOut',
        UserLoginFailed: 'UserLoginFailed',
        UserLogoutFailed: 'UserLogoutFailed',
        UserRecordUpdated: 'UserRecordUpdated',
        UserRecordUpdateFailed: 'UserRecordUpdateFailed',
        UserRecordLoaded: 'UserRecordLoaded',
        UserRecordLoadFailed: 'UserRecordLoadFailed',
        RefreshingToken: 'RefreshingToken',
        RefreshingTokenSuccess: 'RefreshingTokenSuccess',
        RefreshingTokenFailed: 'RefreshingTokenFailed',
        authFailed: 'authFailed',
    };

    /** @type {ApplinksClientOptions  } */
    #options;
    #newLoginWindowRef = null;
    /** @type {ApplinksPanel | false}     */
    #usePanel = false;
    /** @type {string} */ #appId;
    #util = APPLinkUtils;
    /** @type {UserData | null} */
    #UserData;

    #debounceTime = 5000;
    #lastSavedRecordTime = null;

    /**
     * @param {string} appId
     * @param {ApplinksClientOptions} options
     */
    constructor(appId, options = {
        debaunceTime: 5000,
        useClientPanel: false,
        useLocalStorage: true,
        appLinkUtils: APPLinkUtils,
        panelOptions: new ApplinksPanel.Options(),
    }) {
        this.#appId = appId;
        this.#options = options;
        this.#setUpPanel(options);
        if (options.debaunceTime) {
            this.#debounceTime = options.debaunceTime;
        }

        if (options.useLocalStorage) {
            const result = this.#tryToUpdateUserDataFromLocalStorage();
            if (result.message === APPLinksClient.Messages.UserIsSet) {
                this.#updatePanelStatus('logged-in');
            }
        }
    }

    /**
     * @param  {(action: {type : APPLinksClient.ApplinksClientEvents [keyof APPLinksClient.ApplinksClientEvents], data: any})=>void} cb
     */
    set setClientActionCallBack(cb) {
        if (typeof cb === 'function') {
            this.#clientActionCallBack = cb;
            return;
        }
        throw new Error('clientActionCallBack must be a function');
    }

    get innerMethods() {
        return {
            /** @type {(userData : UserData) => (typeof APPLinksClient.Messages[keyof APPLinksClient.Messages])}*/
            setUserData: (userData) => this.#setUserData(userData),
            tryToUpdateUserDataFromLocalStorage: () => this.#tryToUpdateUserDataFromLocalStorage(),
            requestTokenRefresh: () => this.#requestTokenRefresh(),
            /** @type  {(action :  "login" | "logout" | "help" | "account"  ) => Promise<void>}  */
            applinksClientPanelAction: (action) => this.#applinksClientPanelAction(action),
            handleAuthFailure: () => this.#handleAuthFailure(),
            saveUserDataToLocalStorage: () => this.#saveUserDataToLocalStorage(),
        };
    }

    get userStatus() {
        return this.#UserData ? APPLinksClient.Messages.UserIsSet :
            APPLinksClient.Messages.UserNotSet;
    }

    get user() {
        return this.#UserData ? {
            username: this.#UserData.username,
            fullName: this.#UserData.fullName,
            id: this.#UserData.id,
        } : null;
    }

    async loadSavedRecords() {
        if (!this.#validateUserData(this.#UserData)) {
            this.#emitAction({
                type: APPLinksClient.ApplinksClientEvents.UserRecordLoadFailed,
                data: this.#UserData,
            });

            throw new Error(this.#UserData ? 'User data is corrupt or invalid' :
                'User is not logged in; cannot load record without user data');
        }
        this.#updatePanelStatus('updating');
        const url = `${this.#util.recordUrl}?` + new URLSearchParams({
            appId: this.#appId || '',
        });
        const {
            body, status, headers
        } = await this.#util.GetData(url, this.#UserData?.token);

        if (status === 440) {
            if ((await this.#requestTokenRefresh()) === APPLinkUtils.Success) {
                this.#emitAction({
                    type: APPLinksClient.ApplinksClientEvents.UserRecordLoaded,
                    data: {body, status, headers},
                });
                return this.loadSavedRecords();
            }
            this.#handleAuthFailure();

            throw new Error('Auth failed. Cannot load record');
        }

        await this.checkHeadersForAdditionalAction(headers);
        this.#updatePanelStatus('updateComplete');
        this.#emitAction({
            type: APPLinksClient.ApplinksClientEvents.UserRecordLoaded,
            data: {body, status, headers},
        });

        return this.#util.serializeRecordData(body);
    }

    /**
     * @param { Headers  } headers
     */
    async checkHeadersForAdditionalAction(headers) {
        if (headers.get('x-action') === 'login') {
            await this.LoginThroughAppLinks();
        } else if (APPLinkUtils.hasTokenExpiryHeader(headers)) {
            this.#requestTokenRefresh().then();
        }
    }

    /**
     * @param {Record<string, any>} dataToSave
     */
    async savedRecord(dataToSave) {
        if (!this.#validateUserData(this.#UserData)) {
            this.#emitAction({
                type: APPLinksClient.ApplinksClientEvents.UserRecordUpdateFailed,
                data: this.#UserData,
            });

            throw new Error(this.#UserData ? 'User data is corrupt or invalid' :
                'User is not logged in; cannot save record without user data');
        }

        this.#updatePanelStatus('updating');
        const url = `${this.#util.recordUrl}?` + new URLSearchParams({
            appId: this.#appId || '',
        });
        const {
            body, headers, status
        } = await this.#util.PostData(url, dataToSave, this.#UserData.token);
        if (status === 440) {
            if ((await this.#requestTokenRefresh()) === APPLinkUtils.Success) {
                return this.savedRecord(dataToSave);
            }
            this.#handleAuthFailure();
            throw new APPLinksClient.AuthError('cannot save record without user data; auth failed');
        }
        await this.checkHeadersForAdditionalAction(headers);
        this.#updatePanelStatus('updateComplete');
        return body;
    }

    /**
     * @param {Record<string, any>} dataToSave
     */
    debounceSave = (dataToSave) => {
        if (this.#lastSavedRecordTime) {
            clearTimeout(this.#lastSavedRecordTime);
        }
        this.#lastSavedRecordTime = setTimeout(() => {
            if (!this.#UserData) {
                return;
            }
            this.savedRecord(dataToSave).then();
        }, this.#debounceTime);
    };

    /** @type {()=> Promise<LoginData>}*/
    async LoginThroughAppLinks() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const isMobile = screenWidth < 500;
        const cacheBreaker = Math.random().toString(36).substring(7);

        const html = `<div id="iframe-container" style="width: 100%; background-color: #ffffff; overflow: hidden;height: 100%; min-height: 60vh; max-height: 95vh;  display: flex; flex-direction: row;justify-content: center">
            <iframe allowtransparency="true"  style="width: 100% ; height: 100% ;border:none; color: black; background: #FFFFFF;" id="login-i-frame" src="${this.#util.htmlLoginUrl +
        '?cacheBreaker=' + cacheBreaker}"></iframe> </div>`;
        const newLoginWindow = window.open('', '', `width=${isMobile ? screenWidth :
            '500'},height=${isMobile ? screenHeight : '700'}`);
        this.#newLoginWindowRef = newLoginWindow;
        const doc = newLoginWindow.document;
        const viewPortTag = doc.createElement('meta');
        viewPortTag.id = "viewport";
        viewPortTag.name = "viewport";
        viewPortTag.content = "width=device-width; initial-scale=0.8;" +
            " maximum-scale=1.0; user-scalable=0;";
        doc.getElementsByTagName('head')[0].appendChild(viewPortTag);

        doc.open();
        return await new Promise((resolve, reject) => {
            newLoginWindow.addEventListener('message', (msg) => {
                const data = msg.data;
                if (typeof data !== 'object') {
                    return reject('data is not an object');
                }
                const {
                    userData, appData, appSaveData, token, clientConfig, refreshToken
                } = data;
                this.#util.setConfigs(clientConfig);
                if (!data?.token) {
                    return reject(msg);
                }
                this.#UserData =
                    this.#util.serializeUserData(userData, token, refreshToken);
                if (this.#newLoginWindowRef) {
                    this.#newLoginWindowRef.close();
                    this.#newLoginWindowRef = null;
                }


                this.#loginActions();

                resolve({
                    userData: this.#UserData,
                    recordData: appSaveData ?
                        this.#util.serializeRecordData(appSaveData, appData) : undefined,
                });
            }, false);
            doc.write(html);
        });
    }

    async logoutClient() {
        this.#updatePanelStatus('not-logged-in');
        APPLinkUtils.removeUserDataFromLocalStorage();
        const url = this.#util.logoutUrl;
        const {status} = await this.#util.PostData(url, {refreshToken: this.#UserData?.refreshToken}, this.#UserData?.token);

        if (status !== 200) {
            this.#emitAction({
                type: APPLinksClient.ApplinksClientEvents.UserLogoutFailed,
                data: this.#UserData,
            });
            throw new Error('logout failed');
        }
        this.#UserData = null;
        this.#emitAction({
            type: APPLinksClient.ApplinksClientEvents.UserLoggedOut, data: this.#UserData,
        });
    }

    /**
     * @param  {{type : APPLinksClient.ApplinksClientEvents [keyof APPLinksClient.ApplinksClientEvents], data: any}} action
     * @return {*}
     */
    #clientActionCallBack = (action) => {
        action;
    };

    #setUpPanel = (/** @type {{ useClientPanel: any; panelOptions: ApplinksPanelOptions | undefined  }} */ options) => {
        if (options.useClientPanel) {
            this.#usePanel = new ApplinksPanel(options.panelOptions);
            this.#usePanel.actionCallBack =
                (/** @type {"login" | "logout"} */ action) => this.#applinksClientPanelAction(action);
        }
    };

    #applinksClientPanelAction = async (/** @type {"login" | "logout" | "help" | "account" } */ action) => {
        switch (action) {
            case 'login':
                try {
                    const {userData} = /** @type { UserData }*/ await this.LoginThroughAppLinks();
                    localStorage.setItem('user-data', JSON.stringify(userData));
                } catch (err) {
                    this.#clientActionCallBack({
                        type: APPLinksClient.ApplinksClientEvents.UserLoginFailed,
                        data: err
                    });
                }

                break;
            case 'logout':
                this.logoutClient().then();
                break;
            case 'help':
                window.open(this.#util.helpHtmlPath, '_blank');
                break;
            case 'account':
                window.open(this.#util.accountHtmlPath, '_blank');
                break;
        }
    };

    /** @type {(userData : UserData) => (typeof APPLinksClient.Messages[keyof APPLinksClient.Messages])}*/
    #setUserData(userData) {
        if (userData.fullName && userData.id && userData.username && userData.token) {
            this.#UserData = {...userData};
            this.#updatePanelStatus('logged-in');
            return APPLinksClient.Messages.UserIsSet;
        }
        return APPLinksClient.Messages.UserNotSet;
    }

    /**
     *
     * @param {"not-logged-in" | "updating" | "updateComplete" | "error" | "logged-in" | "error-please-relogin"} status
     */
    #updatePanelStatus(status) {
        if (!this.#usePanel) {
            return;
        }
        this.#usePanel.setStatus(status, this.#UserData);
    }

    #loginActions = () => {
        this.#emitAction({
            type: APPLinksClient.ApplinksClientEvents.UserLoggedIn, data: this.#UserData,
        });
        this.#updatePanelStatus('logged-in');
        if (this.#options.useLocalStorage) {
            this.#saveUserDataToLocalStorage();
        }
    };

    #validateUserData = (/** @type {{ fullName: any; id: any; username: any; token: any; }} */ userData) => userData?.fullName &&
        userData.id && userData.username && userData.token;

    #saveUserDataToLocalStorage() {
        this.#util.storeUserDataToLocalStorage(this.#UserData);
    }

    #tryToUpdateUserDataFromLocalStorage() {
        const checkLSForUSerData = () => {
            const userDAtaFromLS = this.#util.getUserDataFromLocalStorage();
            if (!userDAtaFromLS?.length) {
                return false;
            } else {
                return JSON.parse(userDAtaFromLS);
            }
        };
        const userFromLS = checkLSForUSerData();

        if (this.#setUserData(userFromLS) === APPLinksClient.Messages.UserIsSet) {
            return {user: userFromLS, message: APPLinksClient.Messages.UserIsSet};
        }
        return {user: null, message: APPLinksClient.Messages.UserNotSet};
    }

    async #requestTokenRefresh() {
        this.#emitAction({
            type: APPLinksClient.ApplinksClientEvents.RefreshingToken, data: {},
        });
        const {
            status, body
        } = await this.#util.RequestTokenRefresh(this.#util.refreshUrl, this.#UserData?.refreshToken ||
            '', this.#UserData?.token || '');
        if (status === 200 && body.token) {
            this.#UserData.token = body.token;
            this.#UserData.refreshToken = body.refreshToken;

            this.#saveUserDataToLocalStorage();
            this.#emitAction({
                type: APPLinksClient.ApplinksClientEvents.RefreshingTokenSuccess,
                data: {status, body},
            });
            return APPLinkUtils.Success;
        } else {
            this.#emitAction({
                type: APPLinksClient.ApplinksClientEvents.RefreshingTokenFailed,
                data: {status, body},
            });
            this.#UserData = null;
            return APPLinkUtils.Error;
        }
    }

    #handleAuthFailure() {
        this.#emitAction({
            type: APPLinksClient.ApplinksClientEvents.authFailed, data: this.#UserData,
        });
        this.#updatePanelStatus('error-please-relogin');
    }

    /**
     * @param  {{type : APPLinksClient.ApplinksClientEvents [keyof APPLinksClient.ApplinksClientEvents], data: any}} action
     * @return {*}
     */
    #emitAction(action) {
        this.#clientActionCallBack(action);
    }
}
