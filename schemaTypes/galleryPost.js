export default {
    name: 'galleryPost',
    title: 'Gallery Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Job Title',
        type: 'string'
      },
      {
        name: 'slug',
        title: 'Slug (URL)',
        type: 'slug',
        options: { source: 'title', maxLength: 96 }
      },
      {
        name: 'author',
        title: 'Detailer',
        type: 'string'
      },
      {
        name: 'detailType',
        title: 'Type of Service',
        type: 'string',
        options: {
          list: [
            { title: 'Interior Detailing', value: 'interior' },
            { title: 'Exterior Detailing', value: 'exterior' },
            { title: 'Full Detailing (Interior & Exterior)', value: 'fullDetail' },
            { title: 'Scratch Removal', value: 'scratch' },
            { title: 'New Vehicle Prep', value: 'newVehicle' },
            { title: 'Vehicle Protection', value: 'vehicleProtection' }
          ],
          layout: 'radio'
        }
      },      
      {
        name: 'beforePhotos',
        title: 'Before Photos',
        type: 'array',
        of: [{ type: 'image' }]
      },
      {
        name: 'afterPhotos',
        title: 'After Photos',
        type: 'array',
        of: [{ type: 'image' }]
      },
      {
        name: 'notes',
        title: 'Detail Notes',
        type: 'text'
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime'
      }
    ],
    preview: {
        select: {
          title: 'title',
          media: 'afterPhotos.0.asset',
          subtitle: 'detailType'
        }
      }      
  }
  