# Cloudflare DDNS (Dynamic DNS)

This project is a client-server application that enables Dynamic DNS (DDNS) for your Cloudflare-managed domain using IP. It allows a client to send its IP address to a server, which in turn updates the DNS records on Cloudflare to reflect the client's current IPv6 address. This is particularly useful for users with changing IP addresses who want to ensure that their domain always points to the correct location.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)

## Features

- Automatic updating of Cloudflare DNS records with the client's IPv6 address.
- Configuration options for update intervals, subdomains, endpoints, and time zones.
- Secure token-based authentication between the client and server.
- Simple and easy-to-use setup.

## Requirements

Before you get started, make sure you have the following prerequisites installed:

- Node.js and npm on both the client and server.
- A Cloudflare account with a registered domain.
- Knowledge of your Cloudflare API token, email, and domain details.

## Setup

- For server just npm install & edit .env to run
- For client just run index.js & edit ini or use executable file in release tab

## Server .env

Clone this repository to your local machine:

```bash
TOKEN=yourcloudflaretoken
EMAIL=yourcloudflareemail@example.com
DOMAIN=yourdomain.com !root domain
CLOUDFLARE=yourcloudflareapikey
PORT=3000
TZ=Asia/bangkok
TTL=120 time to cache response from CF (sec)
```
## Client .env

Clone this repository to your local machine:

```bash
INTAVAL=300 time to polling update DDNS (sec)
SUBDOMAIN=domain to update exmaple web.example.com or example.com
IPV=6 ipversion 4 or 6
ENDPOINT=http://yourserver.com/update
TZ=Asia/bangkok
