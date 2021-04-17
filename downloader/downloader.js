const http = require('http');
const https = require('https');
const fs = require('fs');

const download = (url, path, node = null) => new Promise((resolve, reject) => {
    try {
        // Write Stream with Events
        var file = fs.createWriteStream(path);
        var url_data = new URL(url);
        var downloaded = 0;

        var client = (url_data.protocol = 'http') ? http : https;

        // Download File
        var request = client.get(url_data, (response) => {
            var filesize = parseInt(response.headers['content-length'], 10);
            
            response.on('data', (chunk) => {
                file.write(chunk);
                downloaded += chunk.length;

                let percentage = (100.0 * downloaded / filesize).toFixed(2);
                node.log(`Downloading ${percentage}%`);

                if(node) 
                    node.status({fill:"yellow",shape:"dot",text:`Download ${percentage}%`});
            }).on('end', () => {
                node.log(`Finish download`);
                file.end();
                resolve();
            }).on('error', (error) => {
                node.log(`Error ${error}`);
                reject(error);
            });
        });
    } catch(error) {
        reject(error);
    }
});

module.exports = function(RED) {
    function QueryNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.on('input', async (msg,send,done) => {
            // Variables
            const payload = msg.payload;
            const url = config.url || payload.url;
            const save_path = config.path || payload.path;
            
            // Logging
            node.log('Downloading.');
            node.status({fill:"yellow",shape:"dot",text:"downloading"});

            // Downloading
            try {
                await download(url, save_path, node);
            } catch(error) {
                node.error(`We found a problem = ${error}`);
                
                // Change status
                node.status({fill:"red",shape:"dot",text:"failed"});
                send(null);
                return;
            }

            node.log('Download success.');
            node.status({fill:"green",shape:"dot",text:"downloaded"});
        });
    }

    RED.nodes.registerType("downloader", QueryNode);
}