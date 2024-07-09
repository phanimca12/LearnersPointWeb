import { Injectable } from '@angular/core';
import { AwdWindowUtil } from './awd-window-util';

enum ContextParam {
  ServletContext = 'servletcontext',
  AppContext = 'appcontext',
  SecurityContext = 'securitycontext'
}

const DEFAULT_SECURITY_CONTEXT = 'awd';

@Injectable({
  providedIn: 'root'
})
export class AwdUrlUtil {
  private win: Window;
  contextParam = ContextParam;

  constructor(awdWindowUtil: AwdWindowUtil) {
    this.win = awdWindowUtil.getBrowserWindow();
  }

  getCurrentUrl(): string {
    return this.win.location.href;
  }

  /**
   * Returns map of query parameters without hash params.
   * Leaves out hash parameters even if they are out of position.
   * Treats every '?' character to be the start of query params.
   * @example 'example.com/?a=1&b=2#HASH?c=3&d' => { a: 1, b: 2, c: 3, d: '' }
   * @param url Leave empty to use current URL
   * @returns Map of query param name and value
   */
  getUrlParamMap(url = this.getCurrentUrl()): { [key: string]: string } {
    const urlParamMap = {};
    url.split('?').forEach((queries: string, index: number) => {
      if (index !== 0) {
        queries.split('&').forEach((UnfilteredParam: string) => {
          const paramString = UnfilteredParam.split('#')[0];
          const paramPair = paramString.split('=');
          const paramName = paramPair[0];
          const paramValue = paramString.includes('=') ? paramPair[1] : '';
          urlParamMap[paramName] = paramValue;
        });
      }
    });
    return urlParamMap;
  }

  getUrlParamValue(paramName: string, url = this.getCurrentUrl()): string {
    return this.getUrlParamMap(url)[paramName];
  }

  getServletContext(url = this.getCurrentUrl()): string {
    return this.getUrlParamValue(ContextParam.ServletContext, url);
  }

  getAppContext(url = this.getCurrentUrl()): string {
    let appContext;
    if (url.includes(ContextParam.AppContext)) {
      appContext = this.getUrlParamValue(ContextParam.AppContext, url);
    } else {
      const servletContext = this.getUrlParamValue(ContextParam.ServletContext, url);
      if (servletContext && servletContext.split('/')[0] !== 'awdServer') {
        appContext = servletContext.split('/')[0];
      }
    }
    return appContext;
  }

  getSecurityContext(url = this.getCurrentUrl()): string {
    let securityContext = DEFAULT_SECURITY_CONTEXT;
    if (url.includes(ContextParam.SecurityContext)) {
      securityContext = this.getUrlParamValue(ContextParam.SecurityContext, url);
    } else {
      const servletContext = this.getUrlParamValue(ContextParam.ServletContext, url);
      if (servletContext && servletContext.includes('/')) {
        securityContext = servletContext.split('/')[1];
      }
    }
    return securityContext;
  }

  getAwdRestBaseUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    const securityContext = this.getSecurityContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/${securityContext}/services/v1`;
    } else {
      restUrl = `${origin}/learnerspoint/v1`;
    }
    return restUrl;
  }

  getAwdRestBaseTAUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    const securityContext = this.getSecurityContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/${securityContext}/services`;
    } else {
      restUrl = `${origin}/awdServer/${securityContext}/services`;
    }
    return restUrl;
  }

  getAwdJobApiBaseUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    const securityContext = this.getSecurityContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/${securityContext}`;
    } else {
      restUrl = `${origin}/awdServer/${securityContext}`;
    }
    return restUrl;
  }

  getElasticSearchBaseUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/elasticSearch/api`;
    } else {
      restUrl = `${origin}/elasticSearch/api`;
    }
    return restUrl;
  }

  getDocumentDeliveryBaseUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    const securityContext = this.getSecurityContext(url);
    let restUrl;

    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/${securityContext}/portal/Communications/services/`;
    } else {
      restUrl = `${origin}/awdServer/${securityContext}/portal/Communications/services/`;
    }
    return restUrl;
  }

  getMgmtConsoleBaseUrl (url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    const securityContext = this.getSecurityContext(url);
    let restUrl;

    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/${securityContext}`;
    } else {
      restUrl = `${origin}/awdServer/${securityContext}`;
    }

    return restUrl;
  }

  getJwtTokenRefreshUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/api/v1/authenticate/refresh`;
    } else {
      restUrl = `${origin}/awdServer/api/v1/authenticate/refresh`;
    }
    return restUrl;
  }

  getJwtAccessTokenRefreshUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/api/services/v1/user/refresh`;
    } else {
      restUrl = `${origin}/awdServer/api/services/v1/user/refresh`;
    }
    return restUrl;
  }

  getV2AuthenticateUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/api/v2/authenticate`;
    } else {
      restUrl = `${origin}/awdServer/api/v2/authenticate`;
    }
    return restUrl;
  }

  getContentManagementUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    const securityContext = this.getSecurityContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/awdServer/${securityContext}/portal`;
    } else {
      restUrl = `${origin}/awdServer/${securityContext}/portal`;
    }
    return restUrl;
  }

  getAwdFaxSelectionUrl(url = this.getCurrentUrl()): string {
    const origin = `${this.getProtocol(url)}//${this.getHost(url)}`;
    const appContext = this.getAppContext(url);
    let restUrl;
    if (appContext) {
      restUrl = `${origin}/${appContext}/ImageRetrieval/awdServer/service/services/v2`;
    } else {
      restUrl = `${origin}/ImageRetrieval/awdServer/service/services/v2`;
    }
    return restUrl;
  }

  private getProtocol(url: string): string {
    return url.split('//')[0];
  }

  private getHost(url: string): string {
    const afterProtocol = url.split('//')[1];
    const beforeQueryStr = afterProtocol.split('?')[0];
    return beforeQueryStr.split('/')[0];
  }
}
