const axios = require("axios"); // A small REST client
const isemail = require("isemail"); // Email address check

function handlePOST(req, res) {
  // We need query strings to set some parameters
  const query = req.query;
  const body = req.body;

  // Let's get user input here from the ChatFuel request
  const firstName = body["first name"] || "Firstname",
    lastName = body["last name"] || "Lastname",
    formResponse = body.formResponse || "No response",
    messengerUserId = body["messenger user id"] || "none-provided",
    preferAnonymous = body.PreferAnonymous || "Yes",
    location = body.location || "none-provided";

  // Some initial variables
  let isAnon = true, // Default to anonymous
    sourceId = 361, // use ?sourceId=361 in Chatfuel to change this
    email = body.email || "noemail",
    hearkenName = query.hearkenName || "abc"; // use hearkenName=

  // Make sourceId query string a number and provide fallback
  sourceId = +query.sourceId || 361; // Nothing special about 361 just the orig number

  // Set the Hearken endpoint. This is exposed through the Hearken embeds
  // https://modules.wearehearken.com/abc/embed/361/share
  const hearkenUrl =
    "https://modules.wearehearken.com/" +
    encodeURIComponent(hearkenName) +
    "/api/questions.js";

  // Hearken accepts a Full Name field
  const fullName = firstName + " " + lastName;

  // Find out if they want to remain anon or not
  // TODO: Do some actual language processing here perhaps?
  if (
    preferAnonymous.toLowerCase().includes("no") ||
    preferAnonymous.toLowerCase().includes("nup") ||
    preferAnonymous.toLowerCase().includes("negative") ||
    preferAnonymous.toLowerCase().includes("false")
  ) {
    isAnon = false;
  } else {
    isAnon = true;
  }

  // Did they not want to provide an email address?
  if (!isemail.validate(email)) {
    email = "";
  }

  // Create our payload onject that we will send to Hearken
  const payload = {
    name: fullName,
    email: email,
    display_text: formResponse,
    custom_fields: [
      { name: "Location", value: location, required: false },
      { name: "MessengerUserID", value: messengerUserId, required: true }
    ],
    opt_in_response: false,
    anonymous: isAnon,
    source: "prompt_embed",
    source_id: sourceId
  };

  // Post to Hearken endpoint
  axios
    .post(hearkenUrl, payload)
    .then(function(response) {
      console.log("Hearken API call successful...");
      // console.log(response);
      res.status(200).json({
        // messages: [{ text: "Your question has been received!" }],
        set_attributes: {
          hearken_name: hearkenName,
          hearken_id: sourceId
        },
        redirect_to_blocks: ["Hearken success"]
      });
    })
    .catch(function(error) {
      console.log(error);
      res.status(500).json({
        // messages: [{ text: "Sorry, there was an error." }],
        set_attributes: {
          hearken_name: hearkenName,
          hearken_id: sourceId
        },
        redirect_to_blocks: ["Hearken error"]
      });
    });
}

function handleGET(req, res) {
  // Do something with the GET request
  res.status(200).json({
    messages: [
      {
        text:
          "This is a GET request. Please use POST if you want to actually do something..."
      }
    ]
  });
}

function handlePUT(req, res) {
  // Do something with the PUT request
  res
    .status(403)
    .send(
      "This is a PUT request. Please use POST if you want to actually do somethign..."
    );
}

// Handle the request and send to appropriate function
exports.hearken = (req, res) => {
  switch (req.method) {
    case "GET":
      handleGET(req, res);
      break;
    case "PUT":
      handlePUT(req, res);
      break;
    case "POST":
      handlePOST(req, res);
      break;
    default:
      res.status(500).send({ error: "Something didn't work. I'm sorry..." });
      break;
  }
};
