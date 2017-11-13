# Chatfuel Hearken Questions
This is a Cloud Function that exposes a HTTP endpoint. It takes input from ChatFuel and sends it to Hearken.

## Setup
Set up your chatfuel bot and then add a "JSON API" card.

Set `TYPE` to `POST`.

Set the `URL` to `https://<your instance>.cloudfunctions.net/hearken?sourceId=361&hearkenUrl=abc`

*For `sourceId` replace the `361` with the number of your hearken submission embed ID. Also for `hearkenName` replace the `abc` with the name/subdomain of your Hearken instance*

Please include the following Chatfuel user attributes:
`{{ first name }}`, `{{ last name }}`, `{{ email }}`, `{{ formResponse }}`, `{{ messenger user id }}`, `{{ PreferAnonymous }}`

*Note: email can be "No" or any string that isn't a valid email address if the user doesn't want to provide one.*

This function will tell Chatfuel to redirect to a "Hearken success" block if it is successful and a "Hearken error" block if there is an error submitting the user information to Hearken.

It will also set a user attribute in Chatfuel `{{ hearken_id }}` to the id number of the Hearken embed.

Optional user attributes: `{{ location }}`

## Author
Send all bug reports to Joshua Byrd <phocks@gmail.com>