### predictd - Satellite orbit prediction daemon
This Docker container runs the awesome [kd2bd/predict](https://github.com/kd2bd/predict) satellite
orbit prediction software in its daemon mode. Clients can connect to the exposed port (1210/UDP) to get information about the satellites orbit.

### Runnig the container
```
docker run --name predictd -p 1210:1210/udp -d -it predictd
```

You control the program by attaching a terminal to the running process.

```
docker attach predictd
```

### Configuration
You can change the ground station location file and TLE file by mounting a volume at ```/data``` containing ```predict.qth``` and ```predict.tle```. You can override these names by setting environment variables when launching the container.

```
docker run --name predictd -p 1210:1210/udp -e TLE_FILE=noaa.tle -e QTH_FILE=station2.qth -d -it predictd
```

### References
The command reference for the predict service mode is available at [github](https://github.com/kd2bd/predict/blob/master/clients/samples/README).

The man page for predict is also on [github](https://github.com/kd2bd/predict/blob/master/docs/pdf/predict.pdf).