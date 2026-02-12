

export function fileDownloader(item) {
    // send  request to backend to download file
    return async () => {
        try {
            // call to API to download file
            const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";
            const response = await fetch(`${API_URL}/download/${encodeURIComponent(item)}`); //endpoint response
            const url = await response.text(); //endpoint response is a URL to the file in S3
            console.log(url);
            const link = document.createElement('a'); //create link element
            link.href = url; //set href to the URL from the response
            link.setAttribute('download', item); //set download attribute to the filename (item) to trigger download with correct name
            link.download = item; //redundant but ensures filename is set for download
            document.body.appendChild(link); //append link to body to make it part of the DOM
            link.click(); //programmatically click the link to trigger the download
            link.remove(); //remove the link from the DOM after clicking
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
}