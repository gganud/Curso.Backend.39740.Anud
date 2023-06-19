const errorHandler = (err, req, res, next) =>
{
  if (err?.message.includes('Not Found')){
      console.error(err.stack);
      return res.status(404).json({ message: err.message });
  }
  else if (err?.name.includes('ZodError')){
      console.error(err.stack);
      return res.status(400).json({ message: err.issues });
  }
  else if (err?.message.includes('Login failed, invalid password.')){
      console.log(err.stack);
      return res.status(401).send({ message: 'Login failed, invalid password.'})
  }
  else if (err?.message.includes('Email and Password invalid format.')){
      console.log(err.stack);
      return res.status(401).send({ message: 'Email and Password invalid format.'})
  }
  else if (err?.message.includes('Product dont exist.')){
    console.log(err.stack);
    return res.status(401).send({ message: 'Product dont exist.'})
  }
  else if (err?.message.includes('Product is already removed.')){
    console.log(err.stack);
    return res.status(401).send({ message: 'Product is already removed.'})
  }
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;