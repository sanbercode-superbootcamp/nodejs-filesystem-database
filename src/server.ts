import { createServer } from "http";
import { parse } from "url";
import { studentListService, addService, updateService, deleteService, studentDetailService } from "./student.service";
import { readLogService } from "./log.service";

const server = createServer((req, res) => {
  const url = parse(req.url);
  switch (url.pathname) {
    case '/student':
      studentDetailService(req, res);
      break;

    case '/student/list':
      studentListService(req, res);
      break;

    case '/student/add':
      addService(req, res);
      break;

    case '/student/update':
      updateService(req, res);
      break;

    case '/student/delete':
      deleteService(req, res);
      break;

    case '/logs':
      readLogService(req, res);
      break;
  
    default:
      res.statusCode = 404;
      res.end();
      break;
  }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running at port ${PORT}`));