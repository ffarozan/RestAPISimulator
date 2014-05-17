# EPG Bibo Server

EPG Bibo Server is Node.js based application written using Express.js Node Package.
This application is developed to address three specific issues involved with TNC EPG application development.
This is not a replacement for existing NDS Bibo Server.

* **Ease of setup** - Existing development set up involves setting up a Web server for serving static files, setting up a simulator to mock REST API calls, and finally configuring reverse proxy from Web server to the simulator. And this set up often fails when connected to a VPN.
* **Ease of use** - Existing REST API simulator only supports GET and POST methods. We need support for PUT and DELETE methods as well. Also the existing simulator doesn't have an implementation to differentiate between GET and POST method for the same URI. 
* **Cross Platform** - Existing simulator currently supports only windows platform. Node.js solves the cross platform issues automatically.

**This application has been tested on Windows 7 64-bit and Ubuntu Linux 13.04 64-bit using Node.js v0.9.9.**

## Installation

* Clone the code from Stash - `git clone ssh://git@nuxepg2.fr.nds.com:7999/~premsubr/epg-bibo-server.git`
* Run NPM installer to install the dependencies - `npm install`

## Setup

* Clone epg-bibo-stubs from Stash - `git clone ssh://git@nuxepg2.fr.nds.com:7999/tn/epg-bibo-stubs.git`
* Edit the `config.json` file to suit your needs. This file is pretty much self-explanatory.

## Running the Server

* From the epg-bibo-server folder execute`node Server`

## Feedback / Feature Request

* For any feedback / feature request please mail me at : `premsubr@cisco.com`
