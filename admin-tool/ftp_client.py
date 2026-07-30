"""Downloads/uploads verzekeraars-data.js from/to the website's server via FTP/FTPS.

download_file() fetches the live file so the app always researches against what's
actually on the server, instead of a local copy that can drift out of sync with it.
"""
import ftplib
import io


def _connect(config: dict) -> ftplib.FTP:
    host = config["ftp_host"]
    port = int(config.get("ftp_port", 21))
    username = config["ftp_username"]
    password = config["ftp_password"]
    use_tls = bool(config.get("ftp_use_tls", True))

    ftp_cls = ftplib.FTP_TLS if use_tls else ftplib.FTP
    ftp = ftp_cls()
    ftp.connect(host=host, port=port, timeout=30)
    ftp.login(user=username, passwd=password)
    if use_tls:
        ftp.prot_p()
    return ftp


def download_file(config: dict) -> str:
    """Connects using the FTP settings in config and returns the current contents
    of config['ftp_remote_path'] as text. Raises on any failure."""
    remote_path = config["ftp_remote_path"]
    ftp = _connect(config)
    try:
        buffer = io.BytesIO()
        ftp.retrbinary(f"RETR {remote_path}", buffer.write)
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()
    return buffer.getvalue().decode("utf-8")


def upload_file(local_content: str, config: dict) -> None:
    """Connects using the FTP settings in config and replaces the remote file at
    config['ftp_remote_path'] with local_content. Raises on any failure — callers
    should not treat a partial upload as success."""
    remote_path = config["ftp_remote_path"]
    ftp = _connect(config)
    try:
        data = io.BytesIO(local_content.encode("utf-8"))
        ftp.storbinary(f"STOR {remote_path}", data)
    finally:
        try:
            ftp.quit()
        except Exception:
            ftp.close()
