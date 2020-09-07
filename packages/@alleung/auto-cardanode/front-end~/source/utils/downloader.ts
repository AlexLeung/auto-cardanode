export function downloadFileWithContents(contents: string, filename: string) {
    const tempAnchor = document.createElement('a');
    tempAnchor.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(contents)}`);
    tempAnchor.setAttribute('download', filename);
    tempAnchor.style.display = 'none';
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
}