const store = {
  name: 'A.R Tiles',
  address: 'Barvabga Road, Jibannagr, Chuadanga',
  users: [
    { name: 'Md. Rana', age: 23, role: 'Administrator' },
    { name: 'Nazmul', age: 26, role: 'employ' },
  ],

  dept: [
    {
      name: 'tiles',
      description: 'Desc',
      companies: [
        {
          name: 'RAK',
          description: 'RAK Beutiful tiles collection',
          address: 'Dahaka, Bangladesh',
          mobile: '01914090085',
          tiles_category: [
            {
              name: 'Ceramic Tiles',
              sizes: [
                {
                  height: 34,
                  width: 45,
                  unit: 'cm',
                  items: [
                    {
                      name: 'name of item',
                      description: 'description',
                      color: [
                        { name: 'Black', stock: 12 },
                        { name: 'Blue', stock: 32 },
                      ],
                      model: 'model',
                      stock: 12,
                      pricePerTiles: 300,
                    },
                    {
                      name: 'name of item',
                      description: 'description',
                      color: 'color',
                      model: 'model',
                      stock: 12,
                    },
                    {
                      name: 'name of item',
                      description: 'description',
                      color: 'color',
                      model: 'model',
                      stock: 12,
                    },
                    {
                      name: 'name of item',
                      description: 'description',
                      color: 'color',
                      model: 'model',
                      stock: 12,
                    },
                    {
                      name: 'name of item',
                      description: 'description',
                      color: 'color',
                      model: 'model',
                      stock: 12,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'AKIJ',
          description: 'RAK Beutiful tiles collection',
          address: 'Dahaka, Bangladesh',
          mobile: '01914090085',
          tiles_category: [{}],
        },
      ],
    },
    {
      name: 'sanitary',
      description: 'Desc',
      companies: [
        {
          name: 'RAK',
          description: 'RAK Beutiful tiles collection',
          address: 'Dahaka, Bangladesh',
          mobile: '01914090085',
          sanitary_catagory: [
            {
              name: 'Wash Basine',
              sizes: [
                {
                  height: 19,
                  width: 34,
                  unit: 'mm',
                  items: [
                    {
                      name: 'Harmony Cover Wash Basine',
                      description: 'Desk',
                      color: 'White',
                      model: 'model-12-3-4',
                      stock: 12,
                      pricePerItem: 1234,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
