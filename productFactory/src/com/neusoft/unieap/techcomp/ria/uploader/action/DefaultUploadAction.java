package com.neusoft.unieap.techcomp.ria.uploader.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.List;
import java.util.zip.CRC32;
import java.util.zip.CheckedOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import com.neusoft.unieap.core.fileupload.FileAttachment;
import com.neusoft.unieap.core.util.BeanUtil;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.inject.Inject;

public class DefaultUploadAction extends ActionSupport implements ServletRequestAware, ServletResponseAware,
		ApplicationContextAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1361693436093292238L;

	private String maxSize;

	private HttpServletRequest request;
	private HttpServletResponse response;

	@Inject(value = "struts.multipart.maxSize")
	public void setMaxSize(String maxsize) {
		this.maxSize = maxsize;
	}

	public String getMaxSize() {
		return maxSize;
	}

	public void setApplicationContext(ApplicationContext context) throws BeansException {}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	public String getFileMaxSize() {
		try {
			Writer writer = response.getWriter();
			writer.write(getMaxSize());
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return NONE;
	}

	/**
	 * 判断是否为合法的路径
	 * 
	 * @param path
	 * @return
	 * */
	private boolean isValidPath(String path) {

		return false;
	}

	public String upload() {
		try {
			List<FileAttachment> files = (List) request.getAttribute(FileAttachment.REQUEST_ATTRIBUTE_NAME);
			
			String path = this.request.getRealPath("/");
			if (files != null) {
				for (FileAttachment file : files) {
					InputStream is = null;
					FileOutputStream os = null;
					PrintWriter out = null;
					if (files.size() > 0) {
						FileAttachment fileAttachment = (FileAttachment) files.get(0);
						// 此时可以通过fileAttachment.getInputStream()获取输入流
						// 此时可以通过new FileOutputStream(pathToSave)放到输出流里
						// 比如把图片自定义存放到服务器F:/2.png
						File dir = new File("D:\\downLoadTemp");
						if (!dir.exists()) {// 判断文件目录是否存在
							dir.mkdirs();
						}
						File pathToSave = new File(path + "\\" + fileAttachment.getFileName());
						try {
							is = fileAttachment.getInputStream();
							os = new FileOutputStream(pathToSave);
							int ch = 0;
							while ((ch = is.read()) != -1) {
								os.write(ch);
							}
						} catch (Exception ex) {
							ex.printStackTrace();
						} finally {
							try {
								if (is != null) {
									is.close();
								}
								if (os != null) {
									os.close();
								}
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return NONE;
		}
	}

	public String delete() {
		try {
			// 获取参数 path
			String path = this.request.getRealPath("/");

			String fileNames = request.getParameter("name");
			fileNames = new String(fileNames.getBytes("iso-8859-1"), "utf-8"); // 进行字符转码
			String[] fileNameArray = fileNames.split(",");
			for (String fileName : fileNameArray) {
				String filePath = path + fileName;
//				getEapFileManager().deleteFile(filePath);
				File file = new File(filePath);
				if (file.isFile() && file.exists()) {
		            file.delete();
		        }
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return NONE;
		}
	}

	public String download() {
		try {
			// 获取参数 path
			String path = this.request.getRealPath("/");
			String fileNames = request.getParameter("name");
			fileNames = new String(fileNames.getBytes("iso-8859-1"), "utf-8"); // 进行字符转码
			String[] fileNameArray = fileNames.split(",");

			if (fileNameArray.length == 1) {
				// 下载一个文件，直接下载
				String filePath = path + fileNameArray[0];
//				InputStream in = getEapFileManager().openFile(filePath);
				InputStream in = new FileInputStream(new File(filePath));
				if (in != null) {
					// 设置下载文件名
					response.setHeader("Content-Disposition", "attachment; filename="
							+ java.net.URLEncoder.encode(fileNameArray[0], "UTF-8"));

					OutputStream out = response.getOutputStream();

					int c;
					while ((c = in.read()) != -1) {
						out.write(c);
					}
					out.flush();

					in.close();
					out.close();
				}
			} else {
				// 设置下载文件名
				response.setHeader("Content-Disposition", "attachment; filename="
						+ java.net.URLEncoder.encode("attachment.zip", "UTF-8"));

				// 下载多个文件，打个ZIP压缩包下载
				OutputStream out = response.getOutputStream();
				CheckedOutputStream cos = new CheckedOutputStream(out, new CRC32());
				ZipOutputStream zipOut = new ZipOutputStream(cos);

				for (String fileName : fileNameArray) {
					String filePath = path + fileName;
//					InputStream in = getEapFileManager().openFile(filePath);
					InputStream in = new FileInputStream(new File(filePath));
					if (in != null) {
						ZipEntry entry = new ZipEntry(fileName);
						zipOut.putNextEntry(entry);

						int count;
						byte data[] = new byte[1024];
						while ((count = in.read(data, 0, 1024)) != -1) {
							zipOut.write(data, 0, count);
						}
						in.close();
					}
				}

				zipOut.close();
				out.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			return NONE;
		}
	}
	public String  getPathFiles()
	{
		return null;
	}
}
