
# Chatfuel Hearken Questions
A JSON endpoint that takes input from [ChatFuel](https://chatfuel.com/) and sends it to [Hearken](https://www.wearehearken.com/).

## Setup
This app is intended for deployment with [Google Cloud Functions](https://cloud.google.com/functions/). General setup:

1. Set up your Chatfuel bot and then add a "JSON API" card.
2. Set `TYPE` to `POST`.
3. Set the `URL` to the endpoint URL that Google Cloud Functions gives you. It will be similar to this: `https://<your instance>.cloudfunctions.net/hearken?sourceId=361&hearkenUrl=abc`

	*Note: For `sourceId` replace the `361` with the number of your hearken submission embed ID. Also for `hearkenName` replace the `abc` with the name/subdomain of your Hearken instance.*

4. Include the following Chatfuel user attributes:
`{{ first name }}`, `{{ last name }}`, `{{ email }}`, `{{ formResponse }}`, `{{ messenger user id }}`, `{{ PreferAnonymous }}`

	*Note: email can be "No" or any string that isn't a valid email address if the user doesn't want to provide one.*

## Response 
This function will tell Chatfuel to redirect to a "Hearken success" block if it is successful and a "Hearken error" block if there is an error submitting the user information to Hearken.

It will also set a user attribute in Chatfuel `{{ hearken_id }}` to the id number of the Hearken embed.

Optional user attributes: `{{ location }}`

## Author
Send all bug reports to [Joshua Byrd](https://github.com/phocks/)
