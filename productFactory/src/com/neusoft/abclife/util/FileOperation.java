package com.neusoft.abclife.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileOperation {

	private static final Logger Logger = LoggerFactory.getLogger(FileOperation.class);
    /**
     * @param args
     */
    public static void main(String[] args) {
//        createDir("d:\\cxser");
//        writeLog("d:\\cxser\\xcewdw.log", "cxsahg54wvdsregrewvdsav盛大是dvd是否为额恶搞额，。‘l；’的撒旦");
//        print(new File("D:\\pruduct"));
        copyFile("D:\\risk.xml", "D:\\riaaa.xml");
    }

    public static boolean createDir(String destDirName) {  
        File dir = new File(destDirName);  
        if (dir.exists()) {  
        	dir.setLastModified(new Date().getTime());
//            System.out.println("创建目录" + destDirName + "失败，目标目录已经存在");  
            return false;  
        }  
        if (!destDirName.endsWith(File.separator)) {  
            destDirName = destDirName + File.separator;  
        }  
        //创建目录  
        if (dir.mkdirs()) {  
//            System.out.println("创建目录" + destDirName + "成功！");  
            return true;  
        } else {  
//            System.out.println("创建目录" + destDirName + "失败！");  
            return false;  
        }  
    } 
    
    /**
     * 创建文件
     * 
     * @param fileName
     * @return
     */
    public static boolean createFile(File fileName) {
        boolean flag = false;
        try {
            if (!fileName.exists()) {
                fileName.createNewFile();
                flag = true;
            }
        } catch (Exception e) {
        	Logger.info("创建文件异常",e);
        }
        return flag;
    }

    /**
     * 读TXT文件内容
     * 
     * @param fileName
     * @return
     */
    public static String readTxtFile(File fileName) throws Exception {
        String result = null;
        FileReader fileReader = null;
        BufferedReader bufferedReader = null;
        try {
            fileReader = new FileReader(fileName);
            bufferedReader = new BufferedReader(fileReader);
            try {
                String read = null;
                while ((read = bufferedReader.readLine()) != null) {
                    result = result + read + "\r\n";
                }
            } catch (Exception e) {
            	Logger.info("读TXT异常",e);
            }
        } catch (Exception e) {
        	Logger.info("读TXT异常",e);
        } finally {
            if (bufferedReader != null) {
                bufferedReader.close();
            }
            if (fileReader != null) {
                fileReader.close();
            }
        }
        return result;
    }
    
    /**
     * 写文件，支持中文字符，在linux redhad下测试过
     * @param path
     * @param str
     */
    public static void writeLog(String path, String str) {
        FileOutputStream out = null;
        try {
            File file = new File(path);
            if (!file.exists()) {
                file.createNewFile();
            }
            out = new FileOutputStream(file);
            StringBuffer sb = new StringBuffer();
            sb.append(str);
            out.write(sb.toString().getBytes("utf-8"));
        } catch (IOException ex) {
//            System.out.println(ex.getStackTrace());
        	Logger.info("支持中文异常",ex);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
//                    System.out.println(e.getStackTrace());
                	Logger.info("支持中文异常",e);
                }
            }
        }
    } 
    
    /**
     * 递归调用此方法列出目录下的所有目录和文件  
     * @param file
     */
    public static List<File> showAllFiles(File file) {
        List<File> list = new ArrayList<File>();
        if (file != null) {
            if (file.isDirectory()) {
                File f[] = file.listFiles();// 列出全部的文件
                if (f != null) {
                    for (int i = 0; i < f.length; i++) {
//                        System.out.println(f[i]);// 递归调用自身
                        list.add(f[i]);
                    }
                }
            } else {
//                System.out.println(file);// 输出路径
            }
        }
        return list;
    }
    
    /**
     * 复制单个文件
     * 
     * @param oldPath
     *            String 原文件路径 如：c:/fqf.txt
     * @param newPath
     *            String 复制后路径 如：f:/fqf.txt
     * @return boolean
     */
    public static void copyFile(String oldPath, String newPath) {
        InputStream inStream = null;
        FileOutputStream fs = null;
        try {
            int bytesum = 0;
            int byteread = 0;
            File oldfile = new File(oldPath);
            if (oldfile.exists()) { // 文件存在时
                inStream = new FileInputStream(oldPath); // 读入原文件
                fs = new FileOutputStream(newPath);
                byte[] buffer = new byte[1444];
                while ((byteread = inStream.read(buffer)) != -1) {
                    bytesum += byteread; // 字节数 文件大小
//                    System.out.println(bytesum);
                    fs.write(buffer, 0, byteread);
                }
            }
        } catch (Exception e) {
//            System.out.println("复制单个文件操作出错");
        	Logger.info("复制单个文件异常",e);
        } finally {
            try {
                if (inStream != null) {
                    inStream.close();
                }
                if (fs != null) {
                    fs.close();
                }
            } catch (IOException e) {
            	Logger.info("复制单个文件异常",e);
            }
        }

    }
}
