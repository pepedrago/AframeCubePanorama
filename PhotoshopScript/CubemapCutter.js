// simple photoshop script to slice and a save a strip cubemap rendering from corona

doc                = app.activeDocument;
DocWidth        = doc.width;
DocHeight       = doc.height;
Stereo            = false;
TotalImages    = 0;
ImageWidth    = 0;
CubemapFolder = "";
CubemapFolderLeft       = "";
CubemapFolderRight     = "";
DocName = doc.name.split(".")[0];

if(DocWidth/DocHeight==12)
{
    Stereo      = true;
    TotalImages = 12;
    CubemapFolderLeft  = CreateNewFolder(doc.path,DocName+"_l");
    CubemapFolderRight= CreateNewFolder(doc.path,DocName+"_r");
}
else
{
   TotalImages = 6;
   CubemapFolder = CreateNewFolder(doc.path,DocName);
}
var DestinationFolder =(!Stereo)? [CubemapFolder] : [CubemapFolderLeft,CubemapFolderRight];
ImageWidth = DocWidth/12;
for(i = 0; i<TotalImages;i++)
{
    app.activeDocument = doc;
    doc.selection.deselect();
    var shapeRef= [ [ImageWidth*i,0], [ImageWidth*i,DocHeight], [(ImageWidth*i)+ImageWidth,DocHeight], [(ImageWidth*i)+ImageWidth,0] ];
    doc.selection.select(shapeRef); 
     var newDoc = CreateNewDoc(((i<=5)? "L":"R")+"-"+((i<=5)? i:i-6)); 
     SaveImage(newDoc,(i<=5)? DestinationFolder[0]:DestinationFolder[1],100);
}
function CreateNewDoc(_name)
{
   doc.selection.copy();  
   var _newDoc = app.documents.add(ImageWidth,DocHeight,72,_name, NewDocumentMode.RGB,DocumentFill.TRANSPARENT);  
   _newDoc.paste();

   return _newDoc;
}
function CreateNewFolder(_rootPath,_folderName)
{
    var outFolder= new Folder(_rootPath + "/"+_folderName);
    if (!outFolder.exists) 
    {
        outFolder.create();
    }
    return outFolder;
}
function SaveImage(_file,_path,_jpegQuality) {  
var sfwOptions = new ExportOptionsSaveForWeb();   
   sfwOptions.format = SaveDocumentType.JPEG;   
   sfwOptions.includeProfile = false;   
   sfwOptions.interlaced = 0;   
   sfwOptions.optimized = true;   
   sfwOptions.quality = _jpegQuality; 
   _file.exportDocument(_path, ExportType.SAVEFORWEB, sfwOptions);  
   _file.close(SaveOptions.DONOTSAVECHANGES);
}  