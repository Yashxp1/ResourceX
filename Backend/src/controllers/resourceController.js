import Resource from '../models/resource.model.js';

export const submitResource = async (req, res) => {
  const { title, address, description } = req.body;
  try {
    if (!title || !address || !description) {
      return res
        .status(400)
        .json({ success: false, message: 'All the fields are required' });
    }

    const newResource = new Resource({ title, address, description });

    await newResource.save();

    return res.status(200).json({
      success: true,
      message: 'Data submitted successfully',
      resource: newResource,
    });
  } catch (error) {
    console.log('Error in resource controller', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getResource = async (req, res) => {
  try {
    const getData = await Resource.find({});
    res.status(200).json({
      success: true,
      message: 'Data fetched successfully',
      data: getData,
    });
  } catch (error) {
    console.log('Error in get resource controller', error);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};
