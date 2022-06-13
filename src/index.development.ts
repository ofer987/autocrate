'use strict';

import SpainCookies from "./spainCookies";
import SpainCookiesBanner from "./spainCookiesBanner";
import "./index.development.scss";

document.addEventListener('DOMContentLoaded', () => {
  var bannerElement = document.getElementById("spain-cookies-banner");
  var policyElement = document.getElementById("spain-cookies-policy");

  new SpainCookies(bannerElement, policyElement);
});
