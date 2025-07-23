# FTP server details
$ftpServer = "ftp://serwer1710802.home.pl"
$ftpUser = "licencje_ftp@wielkopolskizpn.pl"
$ftpPassword = "4Wt8EQYsfre54ges4f"
$ftpFolder = "/wnioski/" # Folder on the FTP server
$outputFile = "C:\Users\wawat\Desktop\ftp_file_list.txt" # Path to save the file list

# Debugging: Display connection details
Write-Host ("Connecting to: {0}{1}" -f $ftpServer, $ftpFolder)

# Create the FTP request for listing files
$request = [System.Net.FtpWebRequest]::Create("$ftpServer$ftpFolder")
$request.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
$request.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPassword)
$request.UseBinary = $true
$request.UsePassive = $true

try {
    # Get the response
    $response = $request.GetResponse()
    $responseStream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($responseStream)
    $fileList = $reader.ReadToEnd()

    # Close the streams
    $reader.Close()
    $response.Close()

    # Transform file list into a comma-separated string
    # Trim ends and split the string into lines, then join them with a ", "
    $formattedFileList = ($fileList -split "`r?`n" | Where-Object { $_ -ne "" }) -join ", "

    # Debugging: Check if file list is transformed
    Write-Host "`nFormatted file list:`n$formattedFileList"

    # Save the comma-separated list to a file
    Set-Content -Path $outputFile -Value $formattedFileList
    Write-Host "The comma-separated list of files has been saved to: $outputFile"
} catch {
    Write-Error "Failed to retrieve the file list: $_"
}