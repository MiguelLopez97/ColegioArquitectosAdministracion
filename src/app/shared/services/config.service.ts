import { Injectable } from '@angular/core';
import { TemplateConfig } from '../template-config/config.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {

    public templateConf: TemplateConfig;
   
    constructor( ) {
        this.setConfigValue();
    }

    setConfigValue() {
        this.templateConf = {
            layout: {
                variant: 'Light', // options:  Dark, Light & Transparent
                dir:'ltr', //Options: ltr, rtl                   
                sidebar: {
                    collapsed: false, //options: true, false  
                    size: 'sidebar-md', // Options: 'sidebar-lg', 'sidebar-md', 'sidebar-sm'
                    backgroundColor: "purple-bliss", // Options: 'black', 'pomegranate', 'king-yna', 'ibiza-sunset', 'flickr', 'purple-bliss', 'man-of-steel', 'purple-love'
                    backgroundImage: true, // Options: true, false | Set true to show background image
                    backgroundImageURL: 'assets/img/bg-login.jpg'
                }
            }
        }
    }



}