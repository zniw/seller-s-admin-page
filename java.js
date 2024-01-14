let amo = 0;
        let API = "https://crudcrud.com/api/a2b7e90188314ddf84a0ce607a124a59/data";
        let totalExpense = 0;

        function formdata(event) {
            event.preventDefault();
            let pnm = document.getElementById("PNM").value;
            let pam = parseFloat(document.getElementById("PAM").value) || 0;

            let OBJ = { pnm, pam };
            //totalExpense += pam;
            //totalamount(OBJ.pam);


            //document.getElementById("val").innerText = totalExpense.toFixed(2);

            ULADDLI(OBJ);
            document.getElementById("PNM").value = '';
            document.getElementById("PAM").value = '';
        }
        

        async function ULADDLI(OBJ) {
            try {
                const response = await axios.post(API, OBJ, {
                    headers: { 'Content-Type': 'application/json' },
                });

                let UL = document.getElementById('UL');
                let LI = document.createElement('li');
                LI.classList.add('LIST');

                let PLI = document.createElement('p');
                PLI.classList.add('PLI');
                PLI.innerHTML = `${response.data.pnm} ${response.data.pam}`;

                let del = document.createElement('button');
                del.classList.add('DEL');
                del.textContent='DEL';
                del.addEventListener('click', async () => {
                    // Delete data from the API
                    try {
                        await axios.delete(`${API}/${response.data._id}`);
                        totalExpense -= parseFloat(response.data.pam);
                        document.getElementById("val").innerText = totalExpense.toFixed(2);
                        // Remove the corresponding LI from the UL
                        UL.removeChild(LI);
                    } catch (error) {
                        console.log('Error deleting data: ', error);
                    }
                });

                LI.appendChild(PLI);
                PLI.appendChild(del);
                UL.appendChild(LI);
            } catch (error) {
                console.log('Error : ', error);
            }
        }
        async function totalamount() {
            try {
                const response = await axios.get(API);
                const data = response.data;
        
                totalExpense = 0;
        
                for (let i = 0; i < data.length; i++) {
                    totalExpense += parseFloat(data[i].pam);
                }
        
                document.getElementById("val").innerText = ` ${totalExpense.toFixed(2)} Rs.`;
            } catch (error) {
                console.log('Error calculating total amount: ', error);
            }
        }
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await axios.get(API);
                const Edata = response.data;
        
                let UL = document.getElementById('UL');
                let amos = document.getElementById('val');
                let totalExpense = 0;
        
                Edata.forEach(ED => {
                    let LI = document.createElement('li');
                    LI.classList.add('LIST');
        
                    let PLI = document.createElement('p');
                    PLI.classList.add('PLI');
                    PLI.innerHTML = `${ED.pnm} ${ED.pam}`;
        
                    let del = document.createElement('button');
                del.textContent = 'DEL'
                    del.classList.add('DEL');
                    del.addEventListener('click', async () => {
                        // Delete data from the API
                        try {
                            await axios.delete(`${API}/${ED._id}`);
                            totalExpense -= parseFloat(ED.pam);
                            amos.innerText = ` ${totalExpense.toFixed(2)} Rs.`;
                            // Remove the corresponding LI from the UL
                            UL.removeChild(LI);
                        } catch (error) {
                            console.log('Error deleting data: ', error);
                        }
                    });
        
                    LI.appendChild(PLI);
                    PLI.appendChild(del);
                    UL.appendChild(LI);
        
                    // Update total expense
                    totalExpense += parseFloat(ED.pam);
                });
        
                // Set initial total expense
                amos.innerText = `${totalExpense.toFixed(2)} Rs.`;
            } catch (error) {
                console.log('Error : ', error);
            }

        });
        totalamount(amount)
