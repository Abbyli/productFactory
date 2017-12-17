package com.neusoft.abclife.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.log4j.Logger;
import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipOutputStream;

public class ZipCompressor {

    private File zipFile;
    private static Logger log = Logger.getLogger(ZipCompressor.class);
    /**
     * 压缩文件构造函数
     * 
     * @param pathName
     *            最终压缩生成的压缩文件：目录+压缩文件名.zip
     */
    public ZipCompressor(String finalFile) {
        zipFile = new File(finalFile);
    }

    /**
     * @param inputFile
     * @param zipFileName
     */
    public static void zip(File inputFile, String zipFileName) {
        try {
            // 创建文件输出对象out,提示:注意中文支持
            FileOutputStream out = new FileOutputStream(new String(zipFileName
                    .getBytes("UTF-8")));
            // 將文件輸出ZIP输出流接起来
            ZipOutputStream zOut = new ZipOutputStream(out);
            log.info("压缩-->开始");

            zip(zOut, inputFile, "");

            log.info("压缩-->结束");
            zOut.close();

        } catch (Exception e) {
        	log.info("",e);
        }

    }

    /**
     * @param zOut
     * @param file
     * @param base
     */
    public static void zip(ZipOutputStream zOut, File file, String base) {
        try {

            // 如果文件句柄是目录
            if (file.isDirectory()) {
                // 获取目录下的文件
                File[] listFiles = file.listFiles();
                // 建立ZIP条目
                zOut.putNextEntry(new ZipEntry(base + "/"));
                log.info("目录名:" + file.getName() + "|加入ZIP条目:" + base + "/");

                base = (base.length() == 0 ? "" : base + "/");

                // 遍历目录下文件
                for (int i = 0; i < listFiles.length; i++) {
                    // 递归进入本方法
                    zip(zOut, listFiles[i], base + listFiles[i].getName());
                }
            }
            // 如果文件句柄是文件
            else {
                if (base == "") {
                    base = file.getName();
                }
                // 填入文件句柄
                zOut.putNextEntry(new ZipEntry(base));
                log.info("文件名:" + file.getName() + "|加入ZIP条目:" + base);

                // 开始压缩
                // 从文件入流读,写入ZIP 出流
                writeFile(zOut, file);
            }

        } catch (Exception e) {
        	log.info("",e);
        }

    }

    /**
     * @param zOut
     * @param file
     * @throws IOException
     */
    public static void writeFile(ZipOutputStream zOut, File file)
            throws IOException {
        log.info("开始压缩" + file.getName());
        FileInputStream in = new FileInputStream(file);
        int len;
        while ((len = in.read()) != -1)
            zOut.write(len);
        log.info("压缩结束" + file.getName());
        in.close();
    }

    public static boolean zip1(String fromFolder, String toFile) {
        ZipOutputStream out = null;
        try {
            File f = new File(fromFolder);
            if(!f.exists()) {
                return false;
            }
            out = new ZipOutputStream(new FileOutputStream(toFile));
            out.setEncoding("gbk");
            zip1(out, f, null);
            log.info("zip done");
        } catch (Exception e) {
        	log.info("",e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                	log.info("",e);
                }
            }
        }
        return true;
    }

    private static void zip1(ZipOutputStream out, File f, String base)
            throws Exception {
        log.info("zipping " + f.getAbsolutePath());
        if (f.isDirectory()) {
            File[] fc = f.listFiles();
            if (base != null) {
                out.putNextEntry(new ZipEntry(base + "/"));
            }
            base = base == null ? "" : base + "/";
            for (int i = 0; i < fc.length; i++) {
                zip(out, fc[i], base + fc[i].getName());
            }
        } else {
            out.putNextEntry(new ZipEntry(base));
            FileInputStream in = new FileInputStream(f);
            int b;
            while ((b = in.read()) != -1) {
                out.write(b);
            }
            in.close();
        }
    }


    /**
     * @param args
     */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        zip1("D:\\pruduct\\1001\\V1.0", "D:\\pruduct\\1001.zip");
    }

}
