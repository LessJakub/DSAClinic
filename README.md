# DSAClinic

## Using Docker to run the code.

### 1. Download Docker (preferably Desktop version) and make sure you can run it in your terminal prompt.
```sh
docker version
```

### 2. Clone the repository and build the Docker Container from `Dockerfile`
```sh
# Clone the repository
git clone https://github.com/LessJakub/DSAClinic.git

# Navigate to repository directory
cd DSAClinic/

# Create Docker Container tagged with name `dsaapp` from current directory containing `Dockerfile`.
docker build -t dsaapp .
```

### 3. Run the container `dsaapp` on port `-p` 8080, detached (in background `-d`) with process name (`--name`) DSA.
```sh
docker run -dp 8080:80 --name DSA dsaapp
```

### 4. Check Docker logs for any issues. List of currently active urls:
```sh
localhost:8080/swagger/index.html
```

```sh
http://localhost:8080/weatherforecast
```
