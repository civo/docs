---
description: Acquiring and managing a Civo account's API key
---

# API Keys

Services in your Civo account can be administered using the Civo API. To authenticate the account for the [API](https://www.civo.com/api) or tools that use it such as the Civo [command-line interface](../overview/civo-cli.md), you will need to provide an API key that is unique to your account.

## Retrieving your API key

![Profile/security header](images/profile_security.png)

In order to acquire the API key for an account, navigate to the [Profile/Security](https://dashboard.civo.com/security) section of your Civo account.

You will be shown an API key like the following:

![API key shown on the Civo dashboard](images/api_key.png)

This API key is unique to your account, and used to authenticate you for tools that interact with the Civo API. For details about the Civo API, refer to the [API documentation](https://www.civo.com/api).

If your account belongs to an Organization, you may see multiple API keys on the page. Each one is tied to a specific account.

## Resetting your API key

If you need to reset the API key for any reason, you can do so by clicking the "Regenerate" button next to the API key you want to reset. This change is immediate, and the new API key would need to be provided for any subsequent requests.