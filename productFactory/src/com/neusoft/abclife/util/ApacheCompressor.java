package com.neusoft.abclife.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.commons.compress.archivers.zip.Zip64Mode;
import org.apache.commons.compress.archivers.zip.ZipArchiveEntry;
import org.apache.commons.compress.archivers.zip.ZipArchiveInputStream;
import org.apache.commons.compress.archivers.zip.ZipArchiveOutputStream;
import org.apache.commons.compress.compressors.bzip2.BZip2CompressorInputStream;
import org.apache.commons.compress.compressors.bzip2.BZip2CompressorOutputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream;
import org.apache.commons.compress.compressors.gzip.GzipCompressorOutputStream;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
//import org.apache.tools.zip.ZipEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.neusoft.abclife.productfactory.blo.PfwebServiceOutterBoImpl;

public class ApacheCompressor {
	
	private static final int bufferLen = 2000;
	private static final Logger Logger = LoggerFactory.getLogger(ApacheCompressor.class);
	/**
	 * Gzip Compress
	 * */
	public static void doGzipCompress(File srcFile, File destFile) {
		OutputStream out = null;
		InputStream is = null;
		try {
			is = new BufferedInputStream(new FileInputStream(srcFile), bufferLen);
			out = new GzipCompressorOutputStream(new BufferedOutputStream(new FileOutputStream(destFile), bufferLen));
		} catch (IOException e) {
			Logger.info("打包异常",e);
		}finally {
			IOUtils.closeQuietly(is);
			IOUtils.closeQuietly(out);
		}
	}
	
	/**
	 * Gzip Decompress
	 * */	
	public static void doGzipDecompress(File srcFile, File destDir) {
		InputStream is = null;
		OutputStream os = null;
		try {
			File destFile = new File(destDir, FilenameUtils.getBaseName(srcFile.toString()));
			is = new GzipCompressorInputStream(new BufferedInputStream(new FileInputStream(srcFile), bufferLen));
			os = new BufferedOutputStream(new FileOutputStream(destFile), bufferLen);
			IOUtils.copy(is, os);
		} catch (IOException e) {
			Logger.info("Gzip",e);
		} finally {
			IOUtils.closeQuietly(is);
			IOUtils.closeQuietly(os);
		}
	}
	
	/**
	 * BZip2 Compress
	 * */	
	public static void doBZip2Compress(File srcFile, File destFile) {
		OutputStream out = null;
		InputStream is = null;
		try {
			is = new BufferedInputStream(new FileInputStream(srcFile), bufferLen);
			out = new BZip2CompressorOutputStream(new BufferedOutputStream(new FileOutputStream(destFile), bufferLen));
			IOUtils.copy(is, out);
		} catch (IOException e) {
			Logger.info("BZip2",e);
		} finally {
			IOUtils.closeQuietly(is);
			IOUtils.closeQuietly(out);
		}
	}
	
	/**
	 * BZip2 Decompress
	 * */
	public static void doBZip2Decompress(File srcFile, File destDir) {
		InputStream is = null;
		OutputStream os = null;
		try {
			File destFile = new File(destDir, FilenameUtils.getBaseName(srcFile.toString()));
			is = new BZip2CompressorInputStream(new BufferedInputStream(new FileInputStream(srcFile), bufferLen));
			os = new BufferedOutputStream(new FileOutputStream(destFile), bufferLen);
			IOUtils.copy(is, os);
		} catch (IOException e) {
			Logger.info("打包异常",e);
		} finally {
			IOUtils.closeQuietly(is);
			IOUtils.closeQuietly(os);
		}
	}
	
	/**
	 * 用于单文件压缩
	 * Zip Compress
	 * */
	public static void doSingleZipCompress(File srcFile, File destFile) {
		ZipArchiveOutputStream out = null;
		InputStream is = null;
		try {
			is = new BufferedInputStream(new FileInputStream(srcFile), bufferLen);
			out = new ZipArchiveOutputStream(new BufferedOutputStream(new FileOutputStream(destFile), bufferLen));
			ZipArchiveEntry entry = new ZipArchiveEntry(srcFile.getName());
			entry.setSize(srcFile.length());
			out.putArchiveEntry(entry);
			IOUtils.copy(is, out);
			out.closeArchiveEntry();
		} catch (IOException e) {
			Logger.info("打包异常",e);
		} finally {
			IOUtils.closeQuietly(is);
			IOUtils.closeQuietly(out);
		}
	}
	
	/**
	 * 用于多文件压缩1
	 * Zip Compress
	 * */
	public static void doMutiZipCompressStep1(String srcFile, String destFile) {		
		ZipArchiveOutputStream out = null;
		try {
			out = new ZipArchiveOutputStream(new File(destFile));
			out.setUseZip64(Zip64Mode.AsNeeded);
			doMutiZipCompressStep2(out, new File(srcFile), "");
			out.close();
		} catch (IOException e) {
			Logger.info("打包异常",e);
		} 
	}
	
	/**
	 * 用于多文件压缩2
	 * Zip Compress
	 * */	
	private static void doMutiZipCompressStep2(ZipArchiveOutputStream out, File srcFile, String base) {
		try {
			if (srcFile.isDirectory()){
				//是文件夹
				File[] subfiles = srcFile.listFiles();
				ZipArchiveEntry entry = new ZipArchiveEntry(base + "/");
				out.putArchiveEntry(entry);				
				base = (base.length() == 0 ? "" : base + "/");
				// 遍历目录下文件
				for(int i = 0; i < subfiles.length; i++){
					doMutiZipCompressStep2(out, subfiles[i], base + subfiles[i].getName());				
				}				
			} else {
				//是文件
				ZipArchiveEntry entry = new ZipArchiveEntry(base);
				out.putArchiveEntry(entry);
				doMutiZipCompressStep3(out, srcFile);
				out.closeArchiveEntry();
			}	
		} catch (IOException e) {
			Logger.info("打包异常",e);
		}
	}
	
	/**
	 * 用于多文件压缩3
	 * Zip Compress
	 * */
	private static void doMutiZipCompressStep3(ZipArchiveOutputStream out, File srcFile) {
		try {
	        FileInputStream in = new FileInputStream(srcFile);
	        int len;
	        while ((len = in.read()) != -1){	        	
				out.write(len);				
	        }          
	        in.close();
		} catch (IOException e) {
			Logger.info("打包异常",e);
		}
	}

	/**
	 * Zip Decompress
	 * */
	public static void doZipDecompress(File srcFile, File destDir) {
		ZipArchiveInputStream is = null;
		try {
			is = new ZipArchiveInputStream(new BufferedInputStream(new FileInputStream(srcFile), bufferLen));
			ZipArchiveEntry entry = null;
			while ((entry = is.getNextZipEntry()) != null) {
				if (entry.isDirectory()) {
					File directory = new File(destDir, entry.getName());
					directory.mkdirs();
				} else {
					OutputStream os = null;
					try {
						os = new BufferedOutputStream(
								new FileOutputStream(new File(destDir, entry.getName())), bufferLen);
						IOUtils.copy(is, os);
					} finally {
						IOUtils.closeQuietly(os);
					}
				}
			}
		} catch (IOException e) {
			Logger.info("打包异常",e);
		} finally {
			IOUtils.closeQuietly(is);
		}
	}
	
//    public static void main(String[] args) {
//    	doMutiZipCompressStep1(
//    			"E:\\workshop-1.2.3-abclife-20150917\\productFactory\\workspaceSVN2\\framework\\webroot\\ProductStore\\risk\\001\\rev4.0", 
//    			"E:\\workshop-1.2.3-abclife-20150917\\productFactory\\workspaceSVN2\\framework\\webroot\\ProductStore\\risk\\001\\rev4.0.zip");
//    }

}
