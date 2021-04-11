# file_io_as_service

The purpose of this repo is to provide an easy way to run file io services in your local machine. What it means
is in your application code , you can avoid using the regular OS defined file I/O calls like file read and file writes in your 
respective programming language.


Instead you start doing the file I/O using an URL like localhost:8090/myfile.txt  or localhost:8093/writefile.txt. ThisURL can b then be configured  later on when a proper platform URL is available to use.


This elevation of your code from OS bound file i/O is the absolute first step in making your code a good Kubernetes citizen.

Here is the detail of how to use the docker files available in the two directories file_i ,File_o for file ingest and ouput respectively.

After cloning the repo , steps are described below.


 For  file  ingestion , all your local input files should be in the directory file_i , where as all your output files will be in the directory file_o.
 
 
For ingestion 
cd file_i.


Run docker build . -t filein  (this command will build a docker image as per the Dockerfile in file_i directory.


Once  the image is ready , you can run the image ,while exposing the port 8090 ,e.g:docker run -p 8090:8090 docker.io/library/filin

This will expose the port 8090 for filr input , which you can access using http get against e.g  localhost:8090/myfile.txt, for a file with name myfile.txt in the file_i directory.

For file ouput :

cd file_o 
For file_o the docker image will  map  the current directory to workspace ,and hence the filename in the URL will be created in the current directory .


For the purpose of doing volume map you shall need the full path of your current directory 
e.g :/Users/pronabp/nectarlab/file_io_as_service/file_o ; This directory has to be volume mapped to the dockerfile working directory - whch is :/usr/src/app . 

Run docker build .  -t filleout

Once the image tagged as fileout is ready , you can run the image :
docker run --volume /Users/pronabp/nectarlab/file_io_as_service/file_o:/usr/src/app -p 8093:8093 docker.io/library/fileout


This will expose the URL :  localhost:8093/write2.txt , e.g and write the content of body in the POST request to the file name supplied in the URL. 


