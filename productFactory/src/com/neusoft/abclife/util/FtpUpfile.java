package com.neusoft.abclife.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.net.ftp.FtpProtocolException;
import sun.net.ftp.impl.FtpClient;

/**
 * @author Neusoft jdk 1.7
 * 
 */
public class FtpUpfile {

	private static final Logger logger = LoggerFactory.getLogger(FtpUpfile.class);
	
	private FtpClient ftpclient;
	private String ipAddress;
	private int ipPort;
	private String userName;
	private String PassWord;

	private String localfilename;
	private String remotefilename;

	/**
	 * 构造函数
	 * 
	 * @param ip
	 *            String 机器IP
	 * @param port
	 *            String 机器FTP端口号
	 * @param username
	 *            String FTP用户名
	 * @param password
	 *            String FTP密码
	 * @throws Exception
	 */
	public FtpUpfile(String ip, int port, String username, String password) {
		ipAddress = new String(ip);
		ipPort = port;
		userName = new String(username);
		PassWord = new String(password);
	}

	/**
	 * 登录FTP服务器
	 * 
	 * @throws Exception
	 */
	public void login(String path) {
		try {
			/*   ******连接服务器的两种方法****** */
			ftpclient = (FtpClient) FtpClient.create();
			try {
				ftpclient.connect(new InetSocketAddress(ipAddress, ipPort));
				ftpclient.login(userName, PassWord.toCharArray());
				logger.info("login success!");
				if (path.length() != 0) {
					// 把远程系统上的目录切换到参数path所指定的目录
					ftpclient.changeDirectory(path);
				}
			} catch (FtpProtocolException e) {
				logger.info("FTP登录异常！",e);
			}
		} catch (IOException ex) {
			logger.info("FTP登录异常！",ex);
		}
	}

	/**
	 * 退出FTP服务器
	 * 
	 * @throws Exception
	 */
	public void logout() {
		try {
			ftpclient.close();
			logger.info("disconnect success");
		} catch (IOException ex) {
			logger.info("not disconnect",ex);
		}
	}

	/**
	 * 上传文件到FTP服务器
	 * 
	 * @param source
	 *            String
	 * @param destination
	 *            String
	 * @throws Exception
	 */
	@SuppressWarnings("static-access")
	public boolean upFile(String localFile, String remoteFile) {
		boolean result = false;
		this.localfilename = localFile;
		this.remotefilename = remoteFile;
		try {
			if (StringUtil.isNotEmpty(this.remotefilename)) {
                String[] remotePaths = this.remotefilename.split("/");
                for(int i=0;i<remotePaths.length;i++){
                	if(StringUtil.isNotEmpty(remotePaths[i]) && !remotePaths[i].contains(".") ){
                		String createPath = remotePaths[i];
                		if (!this.checkFilePathExists(this.ftpclient, createPath)) {
                			ftpclient.makeDirectory(createPath);
							//ftpclient.changeDirectory(remotePaths[i]);
                        }
                	}
                }
                
            }
			OutputStream os = ftpclient.putFileStream(this.remotefilename);
			File file_in = new File(this.localfilename);
			FileInputStream is = new FileInputStream(file_in);
			int c;
			byte[] bytes = new byte[1024];
			while ((c = is.read(bytes)) != -1) {
				os.write(bytes, 0, c);
			}
			result = true;
			is.close();
			os.close();
			logger.info("upload success！");
		} catch (Exception ex) {
			logger.info("上传文件到FTP服务器异常！",ex);
		}
			
		return result;
	}

	/**
	 * 调用示例
	 * 
	 * @param args
	 *            String[]
	 * @throws Exception
	 */
	/*public static void main(String[] args) {
		FtpUpfile ftp = new FtpUpfile("10.10.56.206", 21, "test", "test");
		ftp.login("/");
		
		//上传
		String localFile = "/home/wddpeakking/soft/sjb.jpg";   
		String remoteFile = "/sjb.jpg";
		ftp.upFile(localFile, remoteFile);    
		
		ftp.logout();
		System.out.println("程序运行完成！");
	}*/
	
	/**
     *判断ftp文件路劲是否存在
     * @param remotePath
     */
    private static boolean checkFilePathExists(FtpClient ftpClient, String remotePath)
    {
    	try {
			ftpClient.changeDirectory(remotePath);
		} catch (FtpProtocolException e) {
			logger.info("不需要关注的异常！",e);
			return false;
		} catch (IOException e) {
			logger.info("不需要关注的异常！",e);
			return false;
		}
        return true;
    }
	
}