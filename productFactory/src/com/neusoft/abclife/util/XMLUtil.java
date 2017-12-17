package com.neusoft.abclife.util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.*;
import javax.xml.xpath.*;

public class XMLUtil{
    
	private static final Logger Logger = LoggerFactory.getLogger(XMLUtil.class);
	
    /**
     * 判断是不是xml文件
     * @param filePath
     * @return
     */
    public static boolean checkXMLFile(String filePath) {
        try {
            DocumentBuilderFactory foctory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = foctory.newDocumentBuilder();
            builder.parse(new File(filePath));
//            System.out.println("是xml文件");
            return true;
        } catch (Exception e) {
        	Logger.info("判断xml异常",e);
            return false;
        }
    }
    
    /**
     * 判断是不是xml文件
     * @param filePath
     * @return
     * add by qyt
     */
    public static boolean checkXMLFile(File file) {
        try {
            DocumentBuilderFactory foctory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = foctory.newDocumentBuilder();
            builder.parse(file);
            return true;
        } catch (Exception e) {
        	Logger.info("判断xml异常",e);
            return false;
        }
    }
    
    /**
     * 将node的XML字符串输出到控制台
     * @param node
     */
    public static void output(Node node) {//
        TransformerFactory transFactory=TransformerFactory.newInstance();
        try {
            Transformer transformer = transFactory.newTransformer();
            transformer.setOutputProperty("encoding", "utf-8");
            transformer.setOutputProperty("indent", "yes");
            DOMSource source=new DOMSource();
            source.setNode(node);
            StreamResult result=new StreamResult();
            result.setOutputStream(System.out);
            
            transformer.transform(source, result);
        } catch (TransformerConfigurationException e) {
        	Logger.info("",e);
        } catch (TransformerException e) {
        	Logger.info("",e);
        }   
    }
    
    /**
     * 查找节点，并返回第一个符合条件节点
     * @param express
     * @param source
     * @return
     */
    public static Node selectSingleNode(String express, Object source) {
        Node result=null;
        XPathFactory xpathFactory=XPathFactory.newInstance();
        XPath xpath=xpathFactory.newXPath();
        try {
            result=(Node) xpath.evaluate(express, source, XPathConstants.NODE);
        } catch (XPathExpressionException e) {
        	Logger.info("",e);
        }
        
        return result;
    }
    
    /**
     * 查找节点，返回符合条件的节点集。
     * @param express
     * @param source
     * @return
     */
    public static NodeList selectNodes(String express, Object source) {
        NodeList result=null;
        XPathFactory xpathFactory=XPathFactory.newInstance();
        XPath xpath=xpathFactory.newXPath();
        try {
            result=(NodeList) xpath.evaluate(express, source, XPathConstants.NODESET);
        } catch (XPathExpressionException e) {
        	Logger.info("",e);
        }
        
        return result;
    }
    
    /**
     * 将Document输出到文件
     * @param fileName
     * @param doc
     */
    public static void saveXml(String fileName, Document doc) {
        TransformerFactory transFactory=TransformerFactory.newInstance();
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(fileName);
            Transformer transformer = transFactory.newTransformer();
            transformer.setOutputProperty("indent", "yes");
            DOMSource source=new DOMSource();
            source.setNode(doc);
            StreamResult result=new StreamResult();
            result.setOutputStream(out);
            
            transformer.transform(source, result);
        } catch (TransformerConfigurationException e) {
        	Logger.info("",e);
        } catch (TransformerException e) {
        	Logger.info("",e);
        } catch (FileNotFoundException e) {
        	Logger.info("",e);
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                	Logger.info("",e);
                }
            }
        }
    }
    
    public static void main(String[] args) {
//        String xmlPath = "E:\\productFactory\\source\\WEB\\framework\\webroot\\PRODUCT_RELEASE\\xxx.xml";
//        test(xmlPath);
//        return;
    }
}
