var settings = {
  model: {
    background: "#FFFFFF",
    foreground: "#000000",
    prefix: ""
  },
  mod: {
    background: "#FFFFFF",
    foreground: "#000000",
    prefix: "",
    list: []
  },
  fan: {
    background: "#FFFFFF",
    prefix: "",
    list: []
  },
  notice_style: {
    menu: { foreground: "#FFFFFF", background: "#6C86B7", weight: "bold" },
    tip: { foreground: "#000000", background: "#ffbcbc", weight: "bold" },
    global: { foreground: "#962300", background: "", weight: "bold" },
    warning: { foreground: "", background: "#f9f990", weight: "bold" },
    error: { foreground: "#FF0000", background: "", weight: "bold" }
  },
  ads: {
    enabled: "yes",
    max_items: 10,
    interval: 2,
    items: ["Advertisement 1", "Advertisement 2", "Advertisement 3"]
  },
  tip_menu: {
    enabled: "yes",
    max_items: 35,
    items: [
      { price: 1, text: "Fiddle some bits", active: "yes" },
      { price: 2, text: "Fiddle some bits", active: "yes" },
      { price: 4, text: "Fiddle some bits", active: "yes" },
      { price: 8, text: "Fiddle some bits", active: "yes" },
      { price: 16, text: "Fiddle some bits", active: "yes" },
      { price: 20, text: "Something else", active: "yes" },
      { price: 30, text: "Disabled item", active: "no" }
    ]
  },
  custom_prefixes: {
    max_prefixes: 10,
    prefixes: [{ prefix: "", users: "user1 user2" }]
  }
};

/** helper functions */
function send_notice(text, target_user, style) {
  cb.sendNotice(
    text,
    target_user,
    style.background,
    style.foreground,
    style.weight,
    style.to_group
  );
}

/** Bot definition. */
function CrazyManJdBot(bot_settings) {
  this.bot_settings = bot_settings;
}

CrazyManJdBot.prototype = {
  constructor: CrazyManJdBot,
  makeSettingStr: function(name, label, defaultValue, required) {
    if (required === undefined) {
      required = false;
    }
    return {
      name: name,
      label: label,
      type: "str",
      required: required,
      defaultValue: defaultValue
    };
  },
  makeSettingInt: function(name, label, defaultValue, min, max, required) {
    if (required === undefined) required = false;
    if (min === undefined) min = 1;
    if (max === undefined) max = 100;
    return {
      name: name,
      label: label,
      type: "int",
      minValue: min,
      maxValue: max,
      required: required,
      defaultValue: defaultValue
    };
  },
  makeSettingChoice: function(name, label, choices, defaultValue, required) {
    if (required === undefined) {
      required = false;
    }
    let item = {
      name: name,
      label: label,
      type: "choice",
      required: required,
      defaultValue: defaultValue
    };
    for (i = 0; i < choices.length; i++) {
      item[`choice${i + 1}`] = choices[i];
    }
    return item;
  },
  addChatAds: function(settings_choices) {
    settings_choices.push(
      this.makeSettingChoice(
        "ads_enabled",
        "Enable chat advertisements",
        ["yes", "no"],
        this.bot_settings.ads.enabled
      )
    );
    settings_choices.push(
      this.makeSettingInt(
        "ads_interval",
        "The number of minutes between ads",
        this.bot_settings.ads.interval
      )
    );
    for (let i = 0; i < this.bot_settings.ads.max_items; i++) {
      let j = i + 1;
      let defaultValue = "";
      if (i < this.bot_settings.ads.items.length) {
        defaultValue = this.bot_settings.ads.items[i];
      }
      settings_choices.push(
        this.makeSettingStr(`msg${j}`, `Message ${j}`, defaultValue)
      );
    }
  },
  buildSettingsChoices: function() {
    let settings_choices = [];

    this.addChatAds(settings_choices);
    return settings_choices;
  },
  readSettings: function(settings) {
    // parse out the cb.settings values into a more useable internal format.
  },
  current_ad_index: 0,
  // attach to CB events such as onMessage, onTip...etc.
  initialize: function(cb) {
    loadSettings(cb.settings);
    cb.setTimeout(function() {}, this.bot_settings.chat_ads.interval * 60000);
  }
};

var bot = new CrazyManJdBot(settings);
cb.settings_choices = bot.buildSettingsChoices();
bot.initialize(cb);
//console.log(bot.buildSettingsChoices());
