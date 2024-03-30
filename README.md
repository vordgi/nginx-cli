# nginx-cli

A CLI for conveniently managing nginx with familiar commands (*currently only on Windows*)

## Installation

```bash
npm i nginx-cli -g
```

Then you need to configure the utility by specifying the absolute path to the installed nginx:

```bash
ng c
```

## Usage

### Start nginx

```bash
ng start
```

### Check nginx status

```bash
ng status
```

### Stop nginx

```bash
ng stop
```

### Restart nginx

```bash
ng restart
```

### Run nginx command

In most cases, the above commands will be sufficient, but in some cases, it may be necessary to run specific nginx commands.

This can be done using the following command:

```bash
ng root <COMMAND>
```

For example:

```bash
ng root -s quit
ng root -v
```

## License

[MIT](https://github.com/vordgi/nginx-cli/blob/main/LICENSE)