// cmjd_001 bot
// This is a sample bot. It's loaded onto CB testbed already.
// var menu_on = true;

/*
  Various CB and bot settings.
*/
var settings = [
  {
    name: "model_text",
    type: "str",
    required: false,
    label: "Prefix my messages"
  },
  {
    name: "model_color",
    type: "str",
    required: false,
    label: "My font color (e.g. #FFF6FB)"
  },
  {
    name: "model_background",
    type: "str",
    required: false,
    label: "My background color (e.g. #FFF6FB)"
  },
  {
    name: "mod_users",
    type: "str",
    required: false,
    label: "Mods [user1 user2 user3 ...]"
  },
  {
    name: "mod_text",
    type: "str",
    required: false,
    label: "Prefix mod messages"
  },
  {
    name: "mod_color",
    type: "str",
    required: false,
    label: "Mods font color (e.g. #FFF6FB)"
  },
  {
    name: "mod_background",
    type: "str",
    required: false,
    label: "Mods background color (e.g. #FFF6FB)"
  },
  {
    name: "fan_users",
    type: "str",
    required: false,
    label: "Fans [user1 user2 user3 ...]"
  },
  {
    name: "fan_text",
    type: "str",
    required: false,
    label: "Prefix fan messages"
  },
  {
    name: "fan_background",
    type: "str",
    required: false,
    label: "Fans background color (e.g. #FFF6FB)"
  },
  {
    name: "tip_menu_enabled",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    defaultValue: "yes",
    label: "Display Tip Menu when /menu is typed."
  },
  {
    name: "show_message_on_entry",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    defaultValue: "yes",
    label: "Display a message privately on entry?"
  },
  {
    name: "entry_message",
    type: "str",
    label: "Entry message (if enabled)",
    defaultValue: "Welcome to the room. We're all a bit crazy here!"
  }
];

var default_tip_menu_items = [
  { id: 1, price: 1, text: "I love bit fiddling", active: "yes" },
  { id: 2, price: 2, text: "I love bit fiddling", active: "yes" },
  { id: 3, price: 4, text: "I love bit fiddling", active: "yes" },
  { id: 4, price: 8, text: "I love bit fiddling", active: "yes" },
  { id: 5, price: 16, text: "I love bit fiddling", active: "yes" },
  { id: 6, price: 32, text: "I love bit fiddling", active: "yes" },
  { id: 7, price: 4, text: "I love olipop", active: "yes" },
  { id: 8, price: 4, text: "I love olipop", active: "yes" },
  { id: 9, price: 4, text: "I love olipop", active: "yes" },
  { id: 10, price: 4, text: "I love olipop", active: "yes" },
  { id: 11, price: 4, text: "I love olipop", active: "yes" },
  { id: 12, price: 4, text: "I love olipop", active: "yes" }
];

var default_ad_messages = ["Ad message 1"];

/* Section: notice_styles and send_notice
------------------------------------------
  style_name : {
    background: <html-color-code>,
    foreground: <html-color-code>,
    weight: normal|bold|bolder,
    to_group: red|green|darkblue|lightpurple|darkpurple|lightblue
  }

  see https://chaturbate.com/apps/docs/api/cb.sendNotice.html for reference on to_group
*/
var notice_styles = {
  normal: {}, // use the room defaults.
  user_entry: {
    background: "#bcff9b",
    foreground: "#000000",
    weight: "bold"
  },
  tip: {},
  help_text: {
    background: "",
    foreground: "",
    weight: "normal"
  },
  warning: {
    background: "#fff7b7",
    foreground: "#000000",
    weight: "bolder"
  },
  alert1: {
    background: "#FFFFFF",
    foreground: "#FF0000",
    weight: "bold"
  },
  alert2: {
    background: "#FFFFFF",
    foreground: "#0000FF",
    weight: "bold"
  }
};

function send_notice(text, user, style_name) {
  var style = notice_styles[style_name];
  if (style == null) style = notice_styles.normal;
  cb.sendNotice(
    text,
    user,
    style.background,
    style.foreground,
    style.weight,
    style.to_group
  );
}

/* Section: Command mapping
------------------------------------------
  Each entry in the commands object (hash) is of the following structure.
    "/command" : {
      description: "A brief description of the command."
      requires_mod: true|false,
      action: cmd_function | () => (arrow_notation_statement),
      show_command_in_room: true|false
    }

  "/command" is the command name typed by the user:
    * The command name must include the slash and must be lowercase in this hash. It can be used in upper,lower or mixed case.
    * Description is the text to send to a user if they type "/help". This should give a brief description of the command.
    * If requires_mod is set to true, the command can only be used by a mod or the broadcaster.
    * Use a command specific function if you have more than one line of code for the command. Otherwise use "arrow notation"
    * If show_command_in_room is true, the entire command text will be shown in the room to all users. Otherwise it's hidden by marking it as spam.
*/
var commands = {
  "/warn": {
    description: "Sends a warning message to the indicated user.",
    requires_mod: true,
    action: (m, i, t, text) =>
      send_notice(`Warning [from ${i}]: ${text}`, t, "warning")
  },
  "/prefix": {
    description: "Adds a prefix to a users name.",
    requires_mod: true,
    action: cmd_add_prefix
  },
  "/no_prefix": {
    description: "Removes a prefix from a users name.",
    requires_mod: true,
    action: cmd_remove_prefix
  },
  "/menuon": {
    description: "Turns on the tip menu.",
    requires_mod: true,
    action: () => (cb.settings.tip_menu_enabled = "yes") // for single statement commands with no params. use "arrow notation."
  },
  "/menuoff": {
    description: "Turns off the tip menu.",
    requires_mod: true,
    action: () => (cb.settings.tip_menu_enabled = "no") // for single statement commands with no params. use "arrow notation."
  },
  "/menu": {
    description: "Shows the tip menu.",
    requires_mod: false,
    show_command_in_room: true,
    action: cmd_show_menu
  },
  "/help": {
    description: "Shows the commands and command descriptions.",
    requires_mod: false,
    show_command_in_room: true,
    action: cmd_show_help
  }
};

/* 
Section: command functions 
------------------------------------------
command function signature:
  cmd_descriptive_name(is_mod, invoking_user, target_user, text)

  * prefixing with cmd_ allows other people to know the role of the function.
  * giving it a descriptive name that is related to the command makes it easier to understand which command is being edited.
  * the parameters must be in the order indicated above or you may get unexpected results, or errors.
  * by taking the is_mod flag, the function can behave differently for mods vs non-mods.

*/

function execute_command(msg, message_text, invoking_user, is_mod) {
  var parts = message_text.split(" ");
  var command_name = parts[0].toLowerCase();
  var command = commands[command_name];
  var target_user = null;
  var text = null;
  if (parts.length >= 2) target_user = parts[1];
  if (parts.length >= 3) {
    parts.splice(0, 2);
    text = parts.join(" ");
  }
  // if we have a command, and it's public, or the invoking user is a mod, allow it to execute.
  if (command != null) {
    if (!command.show_command_in_room) {
      msg["X-Spam"] = true; // don't display command text in the room.
    }
    if (!command.requires_mod || is_mod) {
      command.action(is_mod, invoking_user, target_user, text);
    } else {
      send_notice(
        "You do not have permission to execute that command.",
        invoking_user,
        "alert1"
      );
      send_notice(
        `${invoking_user} attempted to execute ${command_name} but is not a mod.`,
        cb.room_slug,
        "alert1"
      );
    }
  }
}

function cmd_show_help(is_mod, invoking_user) {
  var help_text = "The list of commands you can execute is:\n";
  for (var command_name in commands) {
    var command = commands[command_name];
    if (!command.requires_mod || is_mod) {
      help_text += `\u00A0\u00A0\u00A0\u00A0${command_name}\u00A0\u00A0\u00A0-- ${command.description}\n`;
    }
  }
  send_notice(help_text, invoking_user, "help_text");
}

function cmd_show_menu(is_mod, invoking_user) {
  if (cb.settings.tip_menu_enabled == "yes") {
    send_notice("Here is the menu:", invoking_user);
  } else {
    send_notice(
      "The menu is not currently available.",
      invoking_user,
      "alert1"
    );
  }
}

function cmd_add_prefix(is_mod, invoking_user, target_user, text) {
  send_notice(
    `called add_prefix('${invoking_user}','${target_user}','${text}')`,
    invoking_user,
    "alert2"
  );
}

function cmd_remove_prefix(is_mod, invoking_user, target_user) {
  send_notice(
    `called remove_prefix('${invoking_user}','${target_user}')`,
    invoking_user,
    "alert2"
  );
}

/* Section: tip tracking
------------------------------------------

*/
var tips = {
  counter: 0,
  tippers: {},
  last_tip: {},
  last_item: "",
  track_tip: function(tip) {
    var user = tip.user;
    var amount = parseInt(tip.amount);
    last_tip = tip;
    last_item = tip_menu.get_item_by_price(amount);
    if (user in tippers) {
      tippers[user] += amount;
    } else {
      tippers[user] = amount;
    }
  }
};

function build_tip_menu(settings) {
  var result = {
    // all defined tip menu items.
    items: [],
    // a hash of the tip items by the displayed text. This will be an array as some items will display the same text.
    by_text: {},
    // a hash of the tip items by id.
    by_id: {},
    // a hash of the tip items by the price. This is used most often.
    by_price: {},
    // add an item to the tip menu object
    add_item(item) {
      if (this.by_text[item.text] !== undefined) {
        this.by_text[item.text].push(item);
      } else {
        this.by_text[item.text] = [item];
      }
      this.by_id[item.id] = item;
      this.by_price[item.price] = item;
    }
  };
  // TODO: enumerate the settings and find the tip menu items.
  // for now we'll hard code them.
  result.add_item({ text: "I like potatoes.", active: "yes", price: 8 });
  result.add_item({ text: "I like potatoes.", active: "yes", price: 88 });
  result.add_item({ text: "I like potatoes.", active: "yes", price: 888 });
  return result;
}

var tip_menu = build_tip_menu(cb.settings);

/* Section: cb events
------------------------------------------
Hook into the cb object events here. Put functions that directly support this in this section of code.

*/

cb.onMessage(function(msg) {
  var message_text = msg.m;
  var invoking_user = msg.user;
  var is_mod = cb.room_slug == msg.user || msg.is_mod;
  if (message_text[0] === "/") {
    execute_command(msg, message_text, invoking_user, is_mod);
  }
});

cb.onEnter(function(user) {
  if (cb.settings.show_message_on_entry == "yes") {
    send_notice(`Hi ${user.user}!`, user.user, "user_entry");
    send_notice(cb.settings.entry_message, user.user, "user_entry");
  }
});

// Act upon tips.
cb.onTip(function(tip) {
  tips.track_tip(tip);
  var item = tip_menu.by_price(tip.amount);
  if (item.active === "yes") {
    send_notice(`${tip.user} says: :heart2 ${item.text} `, "", "alert1");
  }
});

/* Section: Bot startup
------------------------------------------
Put the code that should execute on bot start up below this comment block.
This includes actions like cb.setTimeout.
*/

cb.settings_choices = settings;
