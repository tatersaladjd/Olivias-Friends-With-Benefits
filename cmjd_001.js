//cmjd_001 bot
// this is a sample bot. It's loaded onto CB testbed already.
var commands = {
  "/prefix": {
    requires_mod: true,
    action: cmd_add_prefix
  },
  "/no_prefix": {
    requires_mod: true,
    action: cmd_remove_prefix
  },
  "/tmenu": {
    requires_mod: true,
    action: cmd_toggle_menu
  },
  "/menu": {
    requires_mod: false,
    show_message_in_room: true,
    action: cmd_show_menu
  }
};

var menu_on = true;

function cmd_show_menu(invoking_user) {
  if (menu_on) {
    show_message(invoking_user, "here is the menu:");
  } else {
    show_message(invoking_user, "the menu is not currently available.");
  }
}

function cmd_toggle_menu(invoking_user) {
  if (menu_on) {
    show_message(invoking_user, "the menu is now off.");
  } else {
    show_message(invoking_user, "the menu is now on.");
  }
  menu_on = !menu_on;
}

function cmd_add_prefix(invoking_user, target_user, text) {
  show_message(
    invoking_user,
    `called add_prefix('${invoking_user}','${target_user}','${text}')`
  );
}

function cmd_remove_prefix(invoking_user, target_user) {
  show_message(
    invoking_user,
    `called remove_prefix('${invoking_user}','${target_user}')`
  );
}

function execute_command(msg, message_text, invoking_user, is_mod) {
  var parts = message_text.split(" ");
  var command_name = parts[0];
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
    if (!command.requires_mod || is_mod) {
      command.action(invoking_user, target_user, text);
      if (!command.show_message_in_room) {
        msg["X-Spam"] = true; // don't display command text in the room.
      }
    } else {
      show_message(
        invoking_user,
        `${invoking_user} attempted to execute ${command_name} but is not a mod.`
      );
    }
  }
}

cb.onMessage(function(msg) {
  var message_text = msg.m;
  var invoking_user = msg.user;
  var is_mod = cb.room_slug == msg.user || msg.is_mod;
  if (message_text[0] === "/") {
    execute_command(msg, message_text, invoking_user, is_mod);
  }
});

function show_message(user, text) {
  cb.sendNotice(text, user, "#FFFFFF", "#FF0000", "bold");
}
