## Node-RED Contrib Downloader

This customized Node-RED is used for downloading files. 

### Installation

For Installing you have to clone this repository, then you have to install this repo by packing the packages like

```
npm pack <The directory that you cloned this repo.>
```

You will get the tgz file. However, if you don't want to pack manually, you can download in the Release tab.

Next, you have to open the Node-RED in the web browser with opening on Manage Palette and selecting install tab. After that, you have to upload the
packed repo to install.

### Usage

If you want to download file without setting in this node, you can input in msg.payload as JSON format like 

```
{"url":"URL","path":"Save Absolute Path"}
```

Then, after deploying this flow, you have to inject the input from another node to invoke download node.

### In Thai Language

You can follow installation manuals inside [my blog post](https://nickuntitled.com/2021/03/27/customize-node-red-module-for-yourself/). For usage, [follow this](https://nickuntitled.com/2021/04/21/1st-customized-node-red-is-downloader/). :P
