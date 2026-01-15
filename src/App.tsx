import { useState } from 'react'
import './App.css'
import Bracket from "./Bracket.jsx";
import formatBracket from "./formatBracket.jsx";
import { TAX_YEARS, TAX_TABLES } from "./tables.ts";

function App() {
  let [taxYear, setTaxYear] = useState("TAX_TABLE_2024");
  const [income, setIncome] = useState(80000);

  return (
    <div className="app-container">
      <h1>Australia Income Tax Calculator</h1>
      <h3>Calculate your income tax based on ATO rates</h3>
    <div className='form-year-btns'>
      <BtnYear taxYear={taxYear} onYearChange={setTaxYear} />
    </div>
    <div className='forms-container'>
      <form id="form-year" className="form-year">
        <DropdownYear
          taxYear={taxYear}//把父组件当前的state值，传给子组件的 prop 名使用”
          onYearChange={(year:string) => {//一个 函数 作为 prop 传给子组件,这个函数会在 子组件的 select 改变时被调用
            setTaxYear(year);//调用 useState 提供的 setter更新父组件的 state,一旦 state 更新：父组件重新 render新的 
                              // taxYear 又会传回 DropdownYear
            console.log("FY year:", year);//打印最新的值
          }}
        />
        {/*
        <h3>Select Tax Year: </h3>
        <select name="tax-year" id="tax-year"
          value={taxYear}
          onChange={(e) => {setTaxYear(e.target.value);
                            console.log("Selected tax year1:", taxYear);//注意这里打印的taxYear还是上一个值，因为setTaxYear是异步的
                            taxYear = e.target.value;//通过这种方式可以获取最新的值,但是严重错误，
                            // React state 不能直接赋值否则 UI 和状态会不同步
                            console.log("Selected tax year2:", taxYear); //这里打印的taxYear是最新的值 
                          }
                  }
        >
          {TAX_YEARS.map(
            (year) => (
                <option key={year.value} value={year.value}>{year.label}</option>
              )
            )
          }
        </select>
*/}
        <TaxTable taxYear={taxYear} data={TAX_TABLES[taxYear]} />
      </form>
      
      <form className='form-calculate'>
        <IncomeForm
          income={income}
          onChange={(e) => setIncome(Number(e.target.value))}
        />
        <TaxResult income={income} table={TAX_TABLES[taxYear]} />
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
      {TAX_YEARS.map(
        (year) => (
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
/* 子组件：下拉选择税务年度 
用户操作 select
      ↓
select onChange 触发
      ↓
调用父组件传进来的 onChange
      ↓
setTaxYear(newValue)
      ↓
父组件 state 更新
      ↓
新的 taxYear 传回 DropdownYear
      ↓
select value 更新
*/
function DropdownYear({ taxYear, onYearChange }: 
                      { taxYear: string; onYearChange: (value: string) => void }
                      ) //定义 prop 类型
{
  return (
    <div className="dropdown p-4 rounded mb-4">
      <h3 className="font-bold mb-2">Select Tax Year</h3>
      <select className='select' 
        value={taxYear}//taxYear 来自父组件这是“受控组件”的关键select 当前选中的值 完全由 React state 决定 taxYear 来自父组件
        onChange={ (e) =>onYearChange(e.target.value)}//调用父组件传进来的 onChange 函数// 用户选中的 option 的 value（string）
                      
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

function TaxTable({ taxYear, data }: { taxYear: string; data: any[] }) {
  console.log("Rendering Table for tax year:", taxYear);
  return (
    <>
    <h3>{taxYear}</h3>
    <div className="p-4 w-[400px] border border-gray-300 rounded-lg m-4 space-y-4 " >
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
function TaxResult({ income, table }: { income: number; table: any[] }) {
  let totalTax = 0;
  return (
    <div className="border p-4 rounded mb-4 bg-blue-50">
      <h3 className="font-bold mb-2">Result</h3>
      <div>
        <p>Total:${income}</p>
        <p>Tax:${/*calculate tax */
          table.map((bracket, index) => {
            if (income <= bracket.end && income >= bracket.start) {
              //console.log(bracket.start, "< ", income, " < ", bracket.end);
              totalTax = Math.round((income - bracket.start) * bracket.rate*100)/100 + bracket.base;

              return totalTax;
            }
          })
        }
        </p>
        <p>After Tax: ${/*CALCULATE INCOME AFTER */
          income - totalTax}</p>
      </div>
    </div>
  )
}

export default App
