import { useState } from 'react'
import './App.css'
import Bracket from "./Bracket.jsx";
import formatBracket from "./formatBracket.jsx";
import { TAX_YEARS, TAX_TABLES } from "./tables.ts";

export default function App() {
  let [taxYear, setTaxYear] = useState("TAX_TABLE_2024");
  const [income, setIncome] = useState(80000);//初始收入80000
  console.log ("initial taxYear:", taxYear);
  
  return (
    <div className="app-container">
      <h1>Australia Income Tax Calculator</h1>
      <h3>Calculate your income tax based on ATO rates</h3>

      <div className='form-year-btns'> {/*年份按钮组  */}
        <BtnYear taxYear={taxYear} onYearChange={setTaxYear} />
      </div>

      <div className='forms-container'>
        
        <form id="form-year" className="form-year">{/*下拉菜单年份和税表  */}
          <DropdownYear                             
            taxYear={taxYear}
            onYearChange={(year:string) => {
              setTaxYear(year);
            }}
          />
          <TaxTable taxYear={taxYear} data={TAX_TABLES[taxYear]} />{/*税表*/}
        </form>

        <form className='form-calculate'>{/*计算税后收入和总税额  */}
          <IncomeForm
            income={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
          <TaxResult income={income} table={TAX_TABLES[taxYear]} /> {/*计算结果  */}
        </form>
      </div>
    </div>
  )
}
/* 子组件：年份按钮组 */
function BtnYear({ taxYear, onYearChange }: 
                  { taxYear: string; onYearChange: (value: string) => void }
                 ) //定义 prop 类型
{
  return (
    <div className="btn-year-container">
      {TAX_YEARS.map((year) => (
        <button key={year.value} //key：React 用来区分列表项（必须）
                type="button"
                className={taxYear === year.value ? "btn-year btn-year-active" : "btn-year"}
                onClick={ () =>onYearChange(year.value)}//调用父组件传进来的 onChange 函数
        >
          {year.label}
        </button>
        )
      )
      }
    </div>
  )
} 
/* 子组件：年份下拉选择 */
function DropdownYear({ taxYear, onYearChange }: 
                      { taxYear: string; onYearChange: (value: string) => void }
                      ) //定义 prop 类型
{
  return (
    <div className="dropdown p-4 rounded mb-4">
      <h3 className="font-bold mb-2">Select Tax Year</h3>
      <select className='select' 
        value={taxYear}
        onChange={ (e) =>onYearChange(e.target.value)}
      >
        {TAX_YEARS.map(
          (year) => (
            <option key={year.value} //key：React 用来区分列表项（必须）
                    value={year.value}>{year.label} 
            </option>//value：select 选中后，e.target.value 的来源
            )
          )
        }
      </select>
    </div>
  )
} 
//税率表格
function TaxTable({ taxYear, data }: { taxYear: string; data: any[] }) {
  console.log("Rendering Table for tax year:", taxYear);
  return (
    <>
    <h3>{taxYear}</h3>
    <div className="p-4 w-[400px] border border-red-300 rounded-lg m-4 space-y-4 " >
      {
        data.map((bracket, index) => {
          const { start, end, base, rate } = formatBracket(bracket);

          return (
            <Bracket
              key={index}//必须有，否则报错Each child in a list should have a unique "key" prop.
              start={start}
              end={end}
              base={base}
              rate={rate}
            />
          );
        }
        )
      }
    </div>
    </>
  )
}
//收入输入表单
function IncomeForm({ income, onChange }: { income: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="border p-4 rounded mb-4">
      <h3 className="font-bold mb-2">Input Your Income</h3>
      <label>Annual Income: </label>
      <input type="number"
        value={income}
        onChange={onChange}
      />
    </div>
  )
}

//计算税后收入和总税额
function TaxResult({ income, table }: { income: number; table: any[] }) {
  let totalTax = 0;
  let afterTax = income;

  table.find((bracket) => {
    if (income <= bracket.end && income >= bracket.start) {//找到对应的税率区间, *100 再 /100 是为了保留两位小数
          totalTax = Math.round((income - bracket.start) * bracket.rate*100)/100 + bracket.base;
          afterTax = income - totalTax;
        }
  });

  return (//只读的组件，不需要 state 和事件处理函数
    <div className="border p-4 rounded mb-4 bg-blue-50">
      <h3 className="font-bold mb-2">Result</h3>
      <div>
        <p>Total:${income}</p>
        <p>Tax:${totalTax}</p>
        <p className='after-tax'>After Tax: ${afterTax}</p>
      </div>
    </div>
  )
}
