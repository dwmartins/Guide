import { siteInfoStore } from "@/store/siteInfoStore";
import { DEFAULT_ICO, SYSTEM_IMAGE_PATH } from "./constants";

class SEOManager {
    setAllMeta() {
        this.setIcon();
        this.setTitle();
        this.setDescription();
        this.setKeywords();
        this.setAuthor();
    }

    setIcon() {
        const ico = siteInfoStore.constants.ico ? `${SYSTEM_IMAGE_PATH}/${siteInfoStore.constants.ico}` : DEFAULT_ICO;

        let link = document.querySelector("link[rel='icon']");
        if (link) {
            link.setAttribute('href', ico);
        } else {
            link = document.createElement('link');
            link.setAttribute('rel', 'icon');
            link.setAttribute('href', ico);
            document.head.appendChild(link);
        }
    }

    setTitle(title = "") {

        if(title) {
            document.title = title;
            return;
        }

        if(siteInfoStore.constants.webSiteName) {
            document.title = siteInfoStore.constants.webSiteName;
            return;
        }
    }

    setDescription(description = "") {
        const metaName = 'description';
        const descriptionContent = description || siteInfoStore.constants.description;

        if(descriptionContent) {
            let metaTag = document.querySelector('meta[name="description"]');

            if (metaTag) {
                metaTag.setAttribute('content', descriptionContent);
            } else {
                metaTag = document.createElement('meta');
                metaTag.setAttribute('name', metaName);
                metaTag.setAttribute('content', descriptionContent);
                document.head.appendChild(metaTag);
            }
        }
    }

    setKeywords(keywords = "") {
        const metaName = 'keywords';
        const keywordsContent = keywords || siteInfoStore.constants.keywords;

        if(keywordsContent) {
            let metaTag = document.querySelector('meta[name="keywords"]');
            if (metaTag) {
                metaTag.setAttribute('content', keywordsContent);
            } else {
                metaTag = document.createElement('meta');
                metaTag.setAttribute('name', metaName);
                metaTag.setAttribute('content', keywordsContent);
                document.head.appendChild(metaTag);
            }
        }
    }

    setAuthor() {
        let metaTag = document.querySelector('meta[name="author"]');
        if (metaTag) {
            metaTag.setAttribute('content', 'Dwmcode Desenvolvimento de sites e otimizações - www.dwmcode.com');
        } else {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'author');
            metaTag.setAttribute('content', 'Dwmcode Desenvolvimento de sites e otimizações - www.dwmcode.com');
            document.head.appendChild(metaTag); 
        }
    }
}

export default new SEOManager();