// Declare prefixes Object (user->text).
var prefixes = new Object();
// Declare claims Object (user->nickname).
var claims = new Object();
// Declare tippers Object (user->total_amount).
var tippers = new Object();
// CSS colors.
// Specific user variables that will be used for cb.settings.
var specific_users = [
  "user_1",
  "user_2",
  "user_3",
  "user_4",
  "user_5",
  "user_6",
  "user_7",
  "user_8",
  "user_9",
  "user_10",
  "user_11",
  "user_12",
  "user_13",
  "user_14",
  "user_15",
  "user_16",
  "user_17",
  "user_18",
  "user_19",
  "user_20"
];
// Silencing var.
var silenced = false;
// Rotating Notifier vars
var i = 0;
var triggered;
var MAXITEMS = 10;
// tipMenu Vars
var lastTipper = "--";
var lastTipAmount = 0;
var tipCounter = 0;
var lastItem = "--";
// Bot settings.
cb.settings_choices = [
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
    name: specific_users[0],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[1],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[2],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[3],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[4],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[5],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[6],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[7],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[8],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[9],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[10],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[11],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[12],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[13],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[14],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[15],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[16],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[17],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[18],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: specific_users[19],
    type: "str",
    required: false,
    label: "Initial prefix for specific user [username prefix]"
  },
  {
    name: "notice_color",
    type: "str",
    required: false,
    label: "Global notices color (e.g. #FFF6FB)"
  },
  {
    name: "notice_background_color",
    type: "str",
    required: false,
    label: "Global notices background color (e.g. #FFF6FB)"
  },
  {
    name: "msgonentry",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    defaultValue: "yes",
    label: "Display a message privately on entry"
  },
  {
    name: "entryMSG",
    type: "str",
    label: "Entry message (if enabled)",
    defaultValue: "Hello!"
  },
  {
    name: "msg1",
    type: "str",
    required: true,
    label: "Message 1"
  },
  {
    name: "msg2",
    type: "str",
    required: false,
    label: "Message 2"
  },
  {
    name: "msg3",
    type: "str",
    required: false,
    label: "Message 3"
  },
  {
    name: "msg4",
    type: "str",
    required: false,
    label: "Message 4"
  },
  {
    name: "msg5",
    type: "str",
    required: false,
    label: "Message 5"
  },
  {
    name: "msg6",
    type: "str",
    required: false,
    label: "Message 6"
  },
  {
    name: "msg7",
    type: "str",
    required: false,
    label: "Message 7"
  },
  {
    name: "msg8",
    type: "str",
    required: false,
    label: "Message 8"
  },
  {
    name: "msg9",
    type: "str",
    required: false,
    label: "Message 9"
  },
  {
    name: "msg10",
    type: "str",
    required: false,
    label: "Message 10"
  },
  {
    name: "msgcolor",
    type: "str",
    label: "Notice color (html code default dark red #000000)",
    defaultValue: "#000000"
  },
  {
    name: "chat_ad",
    type: "int",
    minValue: 1,
    maxValue: 999,
    defaultValue: 2,
    label: "Delay in minutes between notices being displayed (minimum 1)"
  },
  {
    name: "tipmenu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    defaultValue: "yes",
    label: "Display Tip Menu when /menu is typed."
  },
  {
    name: "item_1",
    type: "str",
    label: "Item #1",
    defaultValue: "show ass"
  },
  {
    name: "item_1_price",
    type: "int",
    label: "Price for item #1",
    defaultValue: 25
  },
  {
    name: "item_1_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #1 in tip menu when /menu is typed."
  },
  {
    name: "item_2",
    type: "str",
    label: "Item #2 (optional)",
    defaultValue: "all fours"
  },
  {
    name: "item_2_price",
    type: "int",
    label: "Price for item #2",
    defaultValue: 35
  },
  {
    name: "item_2_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #2 in tip menu when /menu is typed."
  },
  {
    name: "item_3",
    type: "str",
    label: "Item #3 (optional)",
    defaultValue: "show feet"
  },
  {
    name: "item_3_price",
    type: "int",
    label: "Price for item #3",
    defaultValue: 45
  },
  {
    name: "item_3_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #3 in tip menu when /menu is typed."
  },
  {
    name: "item_4",
    type: "str",
    label: "Item #4 (optional)",
    defaultValue: "spread cheeks"
  },
  {
    name: "item_4_price",
    type: "int",
    label: "Price for item #4",
    defaultValue: 50
  },
  {
    name: "item_4_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #4 in tip menu when /menu is typed."
  },
  {
    name: "item_5",
    type: "str",
    label: "Item #5 (optional)",
    defaultValue: "finger hole"
  },
  {
    name: "item_5_price",
    type: "int",
    label: "Price for item #5",
    defaultValue: 100
  },
  {
    name: "item_5_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #5 in tip menu when /menu is typed."
  },
  {
    name: "item_6",
    type: "str",
    label: "Item #6 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_6_price",
    type: "int",
    label: "Price for item #6",
    defaultValue: 75
  },
  {
    name: "item_6_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #6 in tip menu when /menu is typed."
  },
  {
    name: "item_7",
    type: "str",
    label: "Item #7 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_7_price",
    type: "int",
    label: "Price for item #7",
    defaultValue: 85
  },
  {
    name: "item_7_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #7 in tip menu when /menu is typed."
  },
  {
    name: "item_8",
    type: "str",
    label: "Item #8 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_8_price",
    type: "int",
    label: "Price for item #8",
    defaultValue: 95
  },
  {
    name: "item_8_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #8 in tip menu when /menu is typed."
  },
  {
    name: "item_9",
    type: "str",
    label: "Item #9 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_9_price",
    type: "int",
    label: "Price for item #9",
    defaultValue: 100
  },
  {
    name: "item_9_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #9 in tip menu when /menu is typed."
  },
  {
    name: "item_10",
    type: "str",
    label: "Item #10 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_10_price",
    type: "int",
    label: "Price for item #10",
    defaultValue: 125
  },
  {
    name: "item_10_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #10 in tip menu when /menu is typed."
  },
  {
    name: "item_11",
    type: "str",
    label: "Item #11 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_11_price",
    type: "int",
    label: "Price for item #11",
    defaultValue: 96
  },
  {
    name: "item_11_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #11 in tip menu when /menu is typed."
  },
  {
    name: "item_12",
    type: "str",
    label: "Item #12 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_12_price",
    type: "int",
    label: "Price for item #12",
    defaultValue: 97
  },
  {
    name: "item_12_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #12 in tip menu when /menu is typed."
  },
  {
    name: "item_13",
    type: "str",
    label: "Item #13 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_13_price",
    type: "int",
    label: "Price for item #13",
    defaultValue: 98
  },
  {
    name: "item_13_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #13 in tip menu when /menu is typed."
  },
  {
    name: "item_14",
    type: "str",
    label: "Item #14 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_14_price",
    type: "int",
    label: "Price for item #14",
    defaultValue: 99
  },
  {
    name: "item_14_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #14 in tip menu when /menu is typed."
  },
  {
    name: "item_15",
    type: "str",
    label: "Item #15 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_15_price",
    type: "int",
    label: "Price for item #15",
    defaultValue: 101
  },
  {
    name: "item_15_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #15 in tip menu when /menu is typed."
  },
  {
    name: "item_16",
    type: "str",
    label: "Item #16 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_16_price",
    type: "int",
    label: "Price for item #16",
    defaultValue: 905
  },
  {
    name: "item_16_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #16 in tip menu when /menu is typed."
  },
  {
    name: "item_17",
    type: "str",
    label: "Item #17 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_17_price",
    type: "int",
    label: "Price for item #17",
    defaultValue: 915
  },
  {
    name: "item_17_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #17 in tip menu when /menu is typed."
  },
  {
    name: "item_18",
    type: "str",
    label: "Item #18 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_18_price",
    type: "int",
    label: "Price for item #18",
    defaultValue: 925
  },
  {
    name: "item_18_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #18 in tip menu when /menu is typed."
  },
  {
    name: "item_19",
    type: "str",
    label: "Item #19 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_19_price",
    type: "int",
    label: "Price for item #19",
    defaultValue: 935
  },
  {
    name: "item_19_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #19 in tip menu when /menu is typed."
  },
  {
    name: "item_20",
    type: "str",
    label: "Item #20 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_20_price",
    type: "int",
    label: "Price for item #20",
    defaultValue: 945
  },
  {
    name: "item_20_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #20 in tip menu when /menu is typed."
  },
  {
    name: "item_21",
    type: "str",
    label: "Item #21 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_21_price",
    type: "int",
    label: "Price for item #21",
    defaultValue: 955
  },
  {
    name: "item_21_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #21 in tip menu when /menu is typed."
  },
  {
    name: "item_22",
    type: "str",
    label: "Item #22 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_22_price",
    type: "int",
    label: "Price for item #22",
    defaultValue: 965
  },
  {
    name: "item_22_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #22 in tip menu when /menu is typed."
  },
  {
    name: "item_23",
    type: "str",
    label: "Item #23 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_23_price",
    type: "int",
    label: "Price for item #23",
    defaultValue: 975
  },
  {
    name: "item_23_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #23 in tip menu when /menu is typed."
  },
  {
    name: "item_24",
    type: "str",
    label: "Item #24 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_24_price",
    type: "int",
    label: "Price for item #24",
    defaultValue: 985
  },
  {
    name: "item_24_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #24 in tip menu when /menu is typed."
  },
  {
    name: "item_25",
    type: "str",
    label: "Item #25 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_25_price",
    type: "int",
    label: "Price for item #25",
    defaultValue: 995
  },
  {
    name: "item_25_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #25 in tip menu when /menu is typed."
  },
  {
    name: "item_26",
    type: "str",
    label: "Item #26 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_26_price",
    type: "int",
    label: "Price for item #26",
    defaultValue: 996
  },
  {
    name: "item_26_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #26 in tip menu when /menu is typed."
  },
  {
    name: "item_27",
    type: "str",
    label: "Item #27 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_27_price",
    type: "int",
    label: "Price for item #27",
    defaultValue: 997
  },
  {
    name: "item_27_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #27 in tip menu when /menu is typed."
  },
  {
    name: "item_28",
    type: "str",
    label: "Item #28 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_28_price",
    type: "int",
    label: "Price for item #28",
    defaultValue: 998
  },
  {
    name: "item_28_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #28 in tip menu when /menu is typed."
  },
  {
    name: "item_29",
    type: "str",
    label: "Item #29 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_29_price",
    type: "int",
    label: "Price for item #29",
    defaultValue: 996
  },
  {
    name: "item_29_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #29 in tip menu when /menu is typed."
  },
  {
    name: "item_30",
    type: "str",
    label: "Item #30 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_30_price",
    type: "int",
    label: "Price for item #30",
    defaultValue: 996
  },
  {
    name: "item_30_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #30 in tip menu when /menu is typed."
  },
  {
    name: "item_31",
    type: "str",
    label: "Item #31 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_31_price",
    type: "int",
    label: "Price for item #31",
    defaultValue: 996
  },
  {
    name: "item_31_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #31 in tip menu when /menu is typed."
  },
  {
    name: "item_32",
    type: "str",
    label: "Item #32 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_32_price",
    type: "int",
    label: "Price for item #32",
    defaultValue: 996
  },
  {
    name: "item_32_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #32 in tip menu when /menu is typed."
  },
  {
    name: "item_33",
    type: "str",
    label: "Item #33 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_33_price",
    type: "int",
    label: "Price for item #33",
    defaultValue: 996
  },
  {
    name: "item_33_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #33 in tip menu when /menu is typed."
  },
  {
    name: "item_34",
    type: "str",
    label: "Item #34 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_34_price",
    type: "int",
    label: "Price for item #34",
    defaultValue: 996
  },
  {
    name: "item_34_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #34 in tip menu when /menu is typed."
  },
  {
    name: "item_35",
    type: "str",
    label: "Item #35 (optional)",
    defaultValue: "",
    required: false
  },
  {
    name: "item_35_price",
    type: "int",
    label: "Price for item #35",
    defaultValue: 996
  },
  {
    name: "item_35_menu",
    type: "choice",
    choice1: "yes",
    choice2: "no",
    choice3: "hidden",
    defaultValue: "yes",
    label: "Display #35 in tip menu when /menu is typed."
  },
  {
    name: "fwb_msg",
    type: "str",
    label: "FWB command text.",
    defaultValue: ""
  },
  {
    name: "fwb_list",
    type: "str",
    label: "List of people who can use /fwb",
    defaultValue: ""
  },
  {
    name: "fwb_entry_msg",
    type: "str",
    label: "Entry message to people who can use /fwb",
    defaultValue: ""
  }
];
// Fill mods and fans arrays.
var mod_users = [];
var fan_users = [];
if (cb.settings.mod_users !== undefined) {
  mod_users = cb.settings.mod_users.split(" ");
}
if (cb.settings.fan_users !== undefined) {
  fan_users = cb.settings.fan_users.split(" ");
}
// Add the specific user defaults to the prefixes object.
for (var o = 0; o < specific_users.length; o++) {
  var element = specific_users[o];
  if (cb.settings[element] !== undefined) {
    var input = cb.settings[element].split(" "); // Explode input to an array.
    if (input.length >= 2) {
      var target_user = input[0];
      input.splice(0, 1); // Remove target_user from array.
      var text = input.join(" "); // Implode remains of array to string.
      prefix(cb.room_slug, target_user, text);
    }
  }
}

// Send welcome message.
cb.onEnter(function(user) {
  if (cb.settings["msgonentry"] == "yes") {
    var notices = "Hi " + user["user"] + "! ";
    cb.sendNotice(
      notices,
      user["user"],
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
    cb.sendNotice(
      cb.settings["entryMSG"],
      user["user"],
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );

    var present = 0;
    var userArray = cb.settings["fwb_list"].split(" ");
    for (var j = 0; j < userArray.length; j++) {
      if (userArray[j] == user["user"]) {
        present = 1;
      }
    }
    if(present == 1)
    {
      var FWBEntrymessage = cb.settings["fwb_entry_msg"].split("\\n"); // Explode message to an array.
      var FWBEntrymsg = FWBEntrymessage.join("\n");
      cb.sendNotice(
        FWBEntrymsg,
        user["user"],
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
    }
  }
});

// Rotating Notifier function
function chatAd() {
  var msg;
  if (triggered != 1) {
    i = 0;
    triggered = 1;
  }
  while (cb.settings["msg" + (i + 1)] == 0) {
    //skip empty messages
    i++;
    i %= MAXITEMS;
  }

  msg = cb.settings["msg" + (i + 1)];
  i++;
  i %= MAXITEMS;

  cb.sendNotice(
    msg,
    "",
    cb.settings["notice_background_color"],
    cb.settings["notice_color"],
    "bold"
  );
  cb.setTimeout(chatAd, cb.settings.chat_ad * 60000);
}
cb.setTimeout(chatAd, cb.settings.chat_ad * 60000);

// Act upon chat messages.
cb.onMessage(function(msg) {
  var message = msg["m"].split(" "); // Explode message to an array.
  var user = msg["user"];
  var has_access = user == cb.room_slug || msg["is_mod"];
  var commands = [
    "/prefix",
    "/no_prefix",
    "/claim",
    "/free",
    "/notice",
    "/silence",
    "/release",
    "/private",
    "/tippers"
  ]; // Commands that can be called.

  // Check if a command is called.
  if (cbjs.arrayContains(commands, message[0])) {
    msg["X-Spam"] = true; // Hide command from chat by marking it as spam.
    var command = message[0];
    var errorMessages = new Array(); // Do some checks.
    if (!has_access) {
      errorMessages.push("you are not allowed to execute this command.");
    }
    // if (message.length < 2) {errorMessages.push("this command needs an extra parameter, please try again: " + command + " [parameter]");}

    if (errorMessages.length == 0) {
      // No errors, execute!
      var target_user = message[1];
      message.splice(0, 2); // Remove command and target_user from array.
      var text = message.join(" "); // Implode remains of array to string.

      switch (command) {
        case commands[0]:
          prefix(user, target_user, text);
          break;
        case commands[1]:
          removePrefix(user, target_user);
          break;
        case commands[2]:
          claim(user, msg["gender"], target_user, text);
          break;
        case commands[3]:
          removeClaim(user, target_user);
          break;
        case commands[4]:
          cb.sendNotice(
            msg["m"]
              .split(" ")
              .slice(1)
              .join(" "),
            "",
            cb.settings["notice_background_color"],
            cb.settings["notice_color"],
            "bold"
          );
          break;
        case commands[5]:
          silenced = true;
          cb.sendNotice(
            cb.room_slug + " has been silenced!",
            "",
            cb.settings["notice_background_color"],
            cb.settings["notice_color"],
            "bold"
          );
          break;
        case commands[6]:
          silenced = false;
          cb.sendNotice(
            cb.room_slug + " has been released from the silence!",
            "",
            cb.settings["notice_background_color"],
            cb.settings["notice_color"],
            "bold"
          );
          break;
        case commands[7]:
          var private_text =
            "[" +
            user +
            "] " +
            msg["m"]
              .split(" ")
              .slice(1)
              .join(" ");
          cb.sendNotice(private_text, cb.room_slug, "#FFF6FB", "", "bold");
          cb.sendNotice(private_text, "", "#FFF6FB", "", "bold", "red");
          break;
        case commands[8]:
          getTipperList();
          break;
      }
    } else {
      //Errors found, display them to the user!
      cb.sendNotice(errorMessages.join("\n"), user);
    }
  } else if (msg["m"].match(/\/menuoff/i)) {
    var is_mod = cb.room_slug == msg["user"] || msg["is_mod"];
    msg["X-Spam"] = true;
    if (is_mod) {
      cb.settings["tipmenu"] = "no";
    }
  } else if (msg["m"].match(/\/menuon/i)) {
    var is_mod = cb.room_slug == msg["user"] || msg["is_mod"];
    msg["X-Spam"] = true;
    if (is_mod) {
      cb.settings["tipmenu"] = "yes";
    }
  } else if (msg["m"].match(/\/menu/i) && cb.settings["tipmenu"] == "yes") {
    cb.sendNotice(
      user + " requested the tip menu.",
      cb.room_slug,
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
    msg["X-Spam"] = true;
    var notices = " :lovey Say it with a tip :lovey ";
    for (var k = 1; k <= 100; k++) {
      if (
        cb.settings.get("item_" + k) &&
        parseInt(cb.settings["item_" + k + "_price"]) > 0 &&
        cb.settings.get("item_" + k + "_menu") == "yes"
      ) {
        if (parseInt(cb.settings["item_" + k + "_price"]) == 696969) {
          notices += "\n " + cb.settings["item_" + k];
        } else {
          notices +=
            "\n " +
            cb.settings["item_" + k + "_price"] +
            "tk: " +
            cb.settings["item_" + k];
        }
      }
    }
    var is_mod = cb.room_slug == msg["user"] || msg["is_mod"];
    if (!is_mod) {
      cb.sendNotice(
        notices,
        msg["user"],
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
    } else {
      cb.sendNotice(
        notices,
        "",
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
    }
  } else if (msg["m"].match(/\/menu/i) && cb.settings["tipmenu"] == "no") {
    cb.sendNotice(
      user + " tried to request the tip menu.",
      cb.room_slug,
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
    msg["X-Spam"] = true;
    cb.sendNotice(
      "I'm sorry, the tip menu is currently disabled.",
      msg["user"],
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  } else if (msg["m"].match(/\/fwb/i)) {
    var present = 0;
    var userArray = cb.settings["fwb_list"].split(" ");
    for (var j = 0; j < userArray.length; j++) {
      if (userArray[j] == msg["user"]) {
        present = 1;
      }
    }
    if (present == 1) {
      var FWBmessage = cb.settings["fwb_msg"].split("\\n"); // Explode message to an array.
      var FWBmsg = FWBmessage.join("\n");
      cb.sendNotice(
        FWBmsg,
        msg["user"],
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
      cb.sendNotice(
        user + " used the fwb command.",
        cb.room_slug,
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
    } else {
      cb.sendNotice(
        "You do not have permission to use this command.",
        msg["user"],
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
      cb.sendNotice(
        user + " tried to use the fwb command but was denied.",
        cb.room_slug,
        cb.settings["notice_background_color"],
        cb.settings["notice_color"],
        "bold"
      );
    }
    msg["X-Spam"] = true;
  } else {
    // No command.
    if (msg["m"][0] != "/") {
      alterNormalMessage(msg); // Alter the message with prefix and/or claim.
      invokeSettingsCheck(msg); // Check if the extra settings for broadcaster/fan/mod need to be invoked.
      checkIfSilenced(msg);
    }
  }

  return msg;
});

// used by tip menu
function getItem(tokens) {
  for (var l = 1; l <= 100; l++) {
    if (parseInt(cb.settings["item_" + l + "_price"]) == parseInt(tokens)) {
      return cb.settings["item_" + l];
    }
  }
}

// used by tip menu
function getItemActive(tokens) {
  for (var m = 1; m <= 100; m++) {
    if (parseInt(cb.settings["item_" + m + "_price"]) == parseInt(tokens)) {
      return cb.settings["item_" + m + "_menu"];
    }
  }
}

// Act upon tips.
cb.onTip(function(tip) {
  var user = tip["from_user"];
  var amount = parseInt(tip["amount"]);
  if (user in tippers) {
    tippers[user] += amount;
  } else {
    tippers[user] = amount;
  }
  //new stuff by SIMON
  tipCounter += parseInt(tip["amount"]);
  lastTipAmount = parseInt(tip["amount"]);
  lastTipper = tip["from_user"];
  lastItem = getItem(tip["amount"]);
  itemActive = getItemActive(tip["amount"]);
  if (lastItem && cb.settings["tipmenu"] == "yes" && itemActive != "no") {
    cb.sendNotice(
      tip["from_user"] + " :heart2 says: " + getItem(tip["amount"]),
      "",
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  }
  cb.drawPanel();
});

// Add prefix entry.
function prefix(user, target_user, text) {
  if (text.length > 0) {
    prefixes[target_user] = text;
    cb.sendNotice(
      target_user + "'s messages will be prefixed with: " + text,
      user
    );
  } else {
    cb.sendNotice(
      "you forgot to supply a prefix, please try again: /prefix [username] [prefix text]",
      user
    );
  }
}

// Remove prefix entry.
function removePrefix(user, target_user) {
  if (target_user in prefixes) {
    delete prefixes[target_user];
    cb.sendNotice(
      target_user + "'s messages will no longer be prefixed.",
      user,
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  } else {
    cb.sendNotice(
      "no prefix for " + target_user + " found to remove.",
      user,
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  }
}

// Add claim entry.
function claim(user, gender, target_user, text) {
  if (text.length == 0) {
    text = "pet"; // Default value.
  }
  claims[target_user] = "[" + user + "'s " + text + "]";
  var possesive = getPossesive(gender);
  cb.sendNotice(
    user +
      " has claimed " +
      target_user +
      " as " +
      possesive +
      " " +
      text +
      "!",
    "",
    cb.settings["notice_background_color"],
    cb.settings["notice_color"],
    "bold"
  );
}

// Remove claim entry.
function removeClaim(user, target_user) {
  if (target_user in claims) {
    delete claims[target_user];
    cb.sendNotice(
      user + " has freed " + target_user + "!",
      "",
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  } else {
    cb.sendNotice(
      target_user + " hasn't been claimed yet, you can't free this user.",
      user,
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  }
}

// Alter message with prefix and/or claim.
function alterNormalMessage(msg) {
  var user = msg["user"];
  // Prefix text of current user if applicable.
  if (user in prefixes) {
    msg["m"] = prefixes[user] + " " + msg["m"];
  }
  // Claim user if applicable.
  if (user in claims) {
    msg["m"] = claims[user] + " " + msg["m"];
  }
}

// Check if the extra settings for broadcaster/fan/mod need to be invoked.
function invokeSettingsCheck(msg) {
  var mods;
  cb.settings["mods"];
  if (msg["user"] == cb.room_slug) {
    // Broadcaster.
    invokeSettings(msg, "model");
  } else if (cbjs.arrayContains(mod_users, msg["user"])) {
    // Mod.
    invokeSettings(msg, "mod");
  } else if (cbjs.arrayContains(fan_users, msg["user"])) {
    // Fan.
    invokeSettings(msg, "fan");
  }
}

// Invoke bot settings to the message.
function invokeSettings(msg, setting) {
  if (cb.settings[setting + "_text"] !== undefined) {
    msg["m"] = cb.settings[setting + "_text"] + " " + msg["m"];
  }
  if (setting != "fan") {
    // Fans don't have color options.
    msg["c"] = cb.settings[setting + "_color"];
  }
  msg["background"] = cb.settings[setting + "_background"];
}

// Check if broadcaster is silenced.
function checkIfSilenced(msg) {
  if (msg["user"] == cb.room_slug && silenced) {
    msg["X-Spam"] = true;
    cb.sendNotice(
      "you have been silenced by your little devils! Other users will no longer see your messages.",
      msg["user"],
      cb.settings["notice_background_color"],
      cb.settings["notice_color"],
      "bold"
    );
  }
}

// Generate the tippers list.
function getTipperList() {
  var output =
    "Generating tippers list.\n------------------------------------------------";
  var output2 =
    "Generating tipper string.\n------------------------------------------------\n";

  if (Object.keys(tippers).length === 0) {
    output += "\nNo tippers found in current session.";
    output2 += "No tippers found in current session.";
  } else {
    var keysSorted = Object.keys(tippers).sort(function(a, b) {
      return tippers[b] - tippers[a];
    });
    for (n = 0; n < keysSorted.length; n++) {
      var user = keysSorted[n];
      var amount = tippers[user];
      output += "\n" + user + " | " + amount + " tokens";
      output2 += user + " ";
    }
  }
  output += "\n------------------------------------------------";
  output2 += "\n------------------------------------------------";

  output += "\n" + output2;
  cb.sendNotice(output, cb.room_slug);
  cb.sendNotice(output2, "", "", "", "", "red");
}

// Helper function to get possesive pronoun.
function getPossesive(gender) {
  var possesive;
  switch (gender) {
    case "m":
      possesive = "his";
      break;
    case "f":
      possesive = "her";
      break;
    case "s":
      possesive = "its";
      break;
    case "c":
      possesive = "their";
      break;
  }

  return possesive;
}